'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { TableQa } from "./table";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Admin() {
  const [dataset, setDataset] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const supabase = createClient()

  const getDataset = async () => {
    setLoading(true)

    let { data: dataset, error } = await (await supabase).from('dataset').select('*')
    if (error) {
      console.error('Error fetching dataset:', error);
      setLoading(false);
      return;
    }
    setDataset(dataset || [])
    console.log(dataset)

    setLoading(false)
  }

  const handlerSubmit = async () => {
    console.log('handlerSubmit')
    setLoading(true)
    if (!question || !answer) {
      alert('Pertanyaan dan jawaban tidak boleh kosong')
      setLoading(false)
      return
    }
    
    const { data, error } = await supabase
      .from('dataset')
      .insert([
        { question, answer },
      ])
      .select()

      console.log(data)
      setDataset((state) => [...state, ...(data || [])])

      if(error) {
        console.log(error.message)
        return;
      }   
    setLoading(false)
  }

  

  useEffect(() => {
    getDataset()
  },[])


  return(
    <div>
      {/* question */}
      <div className="flex flex-col gap-4 mb-5">
        <div>
          <Label>
            Pertanyaan
          </Label>
          <Textarea 
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Tulis pertanyaanmu di sini..."
            className="mt-2"
          />
        </div>
        <div>
          <Label>
            Jawaban
          </Label>
          <Textarea 
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Tulis jawabanmu disini..."
            className="mt-2"
          />
        </div>
        <div>
          <Button onClick={() => handlerSubmit()}>Simpan</Button>
        </div>
      </div>
      {/* answer */}
      {loading ? (
        <p>memuat...</p>
      ) : (
        <div>
          {dataset.length > 0 && (
          <TableQa data={dataset} handler={getDataset} />
          )}
        </div>
      )}
    </div>
  )
}