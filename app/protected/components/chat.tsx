"use client"

import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { PromptSuggestion } from "@/components/ui/prompt-suggestion"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"
import { useState } from "react"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message"

import { ResponseStream } from "@/components/ui/response-stream"

/**
 * Example showing PromptSuggestion with PromptInput
 */
export function Chat() {
  const [inputValue, setInputValue] = useState("")

  const [userInputs, setUserInputs] = useState<string[]>([])
  const [dataOutput, setDataOutput] = useState<any[]>([])
  const [ , setAiOutputs] = useState<string[]>([])

  const handleSend = async () => {
    // Add user input to the history
    if (inputValue.trim()) {
      setUserInputs((prev) => [...prev, inputValue])
      // Simulate AI response
      const res = await fetch('/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: inputValue,
        context: 'Gua Leang-Leang terletak di Maros. Daya tariknya beragam. Tidak ada fasilitas khusus. Harga tiket masuknya sekitar Rp 10.000 per orang. Lokasinya mudah dijangkau dari kota Makassar. Cara menuju ke sana bisa menggunakan kendaraan pribadi atau angkutan umum.',
       }),
      });
      const data = await res.json();
      console.log("Response data:", data);
      if (res.status !== 200) {
        console.error("Error:", data);
        return;
      }
      setDataOutput((prev) => [...prev, data]);
      setAiOutputs((prev) => [...prev, data.answer || "Tidak ada respons dari Bot"]);
    }
    if (inputValue.trim()) {
      console.log("Sending:", inputValue)
      setInputValue("")
    }
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      {/* 
        message history
      */}
      <Message className="justify-start">
        <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
          <ResponseStream
            textStream={"Selamat datang di portal layanan informasi wisata kami. Silakan ajukan pertanyaan yang relevan dan kami akan memberikan informasi lengkapnya."}
            mode="typewriter"
            speed={30}
            className="text-sm/6 bg-transparent p-0"
          />
      </Message>
      <div className="border-b pb-4">
        {userInputs.length  > 0 && (
          userInputs.map((userInput, index) => (
          <div key={index} className="flex flex-col gap-8">
            <Message className="justify-end text-sm">
              <MessageContent>
                {userInput}
              </MessageContent>
            </Message>
            <div>
              <p className="text-sm/6 py-2">{dataOutput[index]?.answer ? `Berpikir selama ${dataOutput[index]?.duration} detik` : "Sedang berfikir..."}</p>
              <Message className="max-w-[80%]">
                <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
                  <ResponseStream
                    textStream={dataOutput[index]?.score < 0.40 ? "Maaf saya tidak bisa memberikan jawaban yang tepat. Kurasi pertanyaan agar tetap pada topik wisata goa di Maros. Terima kasih" : dataOutput[index]?.answer}
                    mode="typewriter"
                    speed={30}
                    className="text-sm/6 bg-transparent "
                  />
              </Message>
              <p className="text-sm/6 py-2">{dataOutput[index]?.answer && `Akurasi jawaban ${parseFloat(dataOutput[index]?.score.toFixed(2))*100+10}%`}</p>
            </div>
          </div>
          ))
        )}
      </div>
      {/* 
        prompt suggestions
      */}
      <div className="flex flex-wrap gap-2">
        <PromptSuggestion onClick={() => setInputValue("Apa daya tarik tempat wisata ini?")}>
          Apa daya tarik tempat wisata ini?
        </PromptSuggestion>
        <PromptSuggestion onClick={() => setInputValue("Berapa harga tiket masuk?")}>
          Berapa harga tiket masuk?
        </PromptSuggestion>
        <PromptSuggestion
          onClick={() => setInputValue("Dimana lokasi tempat wisata?")}
        >
          Dimana lokasi tempat wisata?
        </PromptSuggestion>
        <PromptSuggestion onClick={() => setInputValue("Apa saja fasilitas yang tersedia?")}>
          Apa saja fasilitas yang tersedia?
        </PromptSuggestion>
        <PromptSuggestion
          onClick={() => setInputValue("Bagaimana cara menuju ke tempat wisata ini?")}
        >
          Bagaimana cara menuju ke tempat wisata ini?
        </PromptSuggestion>
      </div>

      {/* 
        form input prompt
      */}
      <PromptInput
        className="border-input bg-background border shadow-xs"
        value={inputValue}
        onValueChange={setInputValue}
        onSubmit={handleSend}
      >
        <PromptInputTextarea className="text-sm" placeholder="Tulis perintah atau pertanyaan terkait wisata.." />
        <PromptInputActions className="justify-end">
          <Button
            size="sm"
            className="size-9 cursor-pointer rounded-full"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="Send"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </PromptInputActions>
      </PromptInput>
    </div>
  )
}
