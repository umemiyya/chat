import { NextResponse } from 'next/server';
import { pipeline } from '@huggingface/transformers';
import { createClient } from '@/lib/supabase/client';

function bersihkan(str: string) {
  return str.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

const supabase = createClient();
const loadModel = pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');

export async function POST(req: Request) {
  try {
    const { question, context } = await req.json();

    // Validasi input
    if (typeof question !== 'string' || (context && typeof context !== 'string')) {
      return NextResponse.json({ error: 'Invalid question or context' }, { status: 400 });
    }

    const answerer = await loadModel;

    // Cek ke Supabase
    const { data: dataset, error } = await supabase.from('dataset').select('*');
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const questionLowerCase = bersihkan(question);
    const found = dataset?.find(item => bersihkan(item.question) === questionLowerCase);

    if (found) {
      const output = await answerer(question, found.answer);
      return NextResponse.json(output);
    }

    // Jika tidak ditemukan di Supabase dan context disediakan
    if (context) {
      const output = await answerer(question, context);
      return NextResponse.json(output);
    }

    return NextResponse.json({ error: 'No matching question and no context provided' }, { status: 400 });

  } catch (err: unknown) {
    console.error('Error during QA:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API route!' });
}
