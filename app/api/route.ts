
import { NextResponse } from 'next/server';
import { pipeline } from '@huggingface/transformers';

// {
  //   answer: "a nice puppet",
  //   score: 0.5768911502526741
  // }
  
  export async function POST(req: Request) {
    
  const answerer = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');
  try {
    const { question, context } = await req.json();

    console.log('Received question:', question);
    console.log('Received context:', context);

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
