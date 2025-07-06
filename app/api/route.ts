// // pages/api/analyze.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import nlp from 'compromise';

import { NextResponse } from "next/server";

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ error: 'No text provided' });
//   }

//   const doc = nlp(text);
//   const nouns = doc.nouns().out('array');
//   const verbs = doc.verbs().out('array');
//   const people = doc.people().out('array');

//   res.status(200).json({ nouns, verbs, people });
// }

export async function GET() {
  return NextResponse.json({
    message: "This is a placeholder for the analyze endpoint. Please implement your logic here.",
  })
}

export async function POST(req: Request) {
  const { input } = await req.json();

  console.log("Received input:", input);

  if (!input) {
    return NextResponse.json({ error: 'No input provided' }, { status: 400 });
  }

  // const doc = nlp(input);
  // const nouns = doc.nouns().out('array');
  // const verbs = doc.verbs().out('array');
  // const people = doc.people().out('array');

  return NextResponse.json({
    message: "Hello Dek!"
  });
}