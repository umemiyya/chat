
import { NextResponse } from 'next/server';
import { pipeline } from '@huggingface/transformers';
import { createClient } from '@/lib/supabase/client';

// {
  //   answer: "a nice puppet",
  //   score: 0.5768911502526741
  // }

function bersihkan(str:string) {
  return str.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

const loadModel = pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');

const supabase = createClient();
const answerer = await loadModel;
  export async function POST(req: Request) {
    
  try {
    const { question, context } = await req.json();
    // get from api supabase
    
  const { data: dataset, } = await (await supabase).from('dataset').select('*')

  const questionLowerCase = bersihkan(question.toString());

  // check if quetion have identic dataset quetion
  if (dataset && dataset.length > 0) {
    const found = dataset.find(item => bersihkan(item.question.toString()) === questionLowerCase);
    if (found) {
      console.log('Found matching question in dataset:', found.question);
      const output = await answerer(question, found.answer);
      return NextResponse.json(output);
    }
  }
          
    // Validasi tipe data
    if (typeof question !== 'string' || typeof context !== 'string') {
      return NextResponse.json(
        { error: 'question and context must be strings' },
        { status: 400 }
      );
    }

    // Jalankan QA
    const output = await answerer(question, context);

    return NextResponse.json(output);

  } catch (err: unknown) {
  console.error('Error during QA:', err);

  let message = 'Unknown error';

  if (err instanceof Error) {
    message = err.message;
  }

  return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API route!' });
}
