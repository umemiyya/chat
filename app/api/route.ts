import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { similarity } from '@/lib/utils';

function bersihkan(str:string) {
  return str.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

const supabase = createClient();
// transformers

// const answerer = await loadModel;
export async function POST(req: Request) {
  const start = performance.now();
  try {
    const { question, context } = await req.json();

    const { data: dataset, } = await (await supabase).from('dataset').select('*')

    const questionLowerCase = bersihkan(question.toString());

    if (dataset && dataset.length > 0) {
      const bestMatchContext = similarity(questionLowerCase, dataset ?? [])
      const end = performance.now();
      const durationSec = ((end - start) / 1000).toFixed(2);
      return NextResponse.json({ answer: `${bestMatchContext.context}`, score: bestMatchContext.score, duration: durationSec });
    }

    // Validasi tipe data
    if (typeof question !== 'string' || typeof context !== 'string') {
      return NextResponse.json(
        { error: 'question and context must be strings' },
        { status: 400 }
      );
    }
  } catch (err: unknown) {
    console.error('Error during QA:', err);
    let message = 'Unknown error';
    if (err instanceof Error) {
      message = err.message;
    }
      const end = performance.now();
      const durationSec = ((end - start) / 1000).toFixed(2);
    return NextResponse.json({ error: message, duration: durationSec }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API route!' });
}
