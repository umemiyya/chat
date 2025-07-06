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
  const [aiOutputs, setAiOutputs] = useState<string[]>([])

  const handleSend = () => {
    // Add user input to the history
    if (inputValue.trim()) {
      setUserInputs((prev) => [...prev, inputValue])
      // Simulate AI response
      setAiOutputs((prev) => [...prev, "AI is thinking..."])
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
        <MessageAvatar src="/avatars/ai.png" alt="CB" fallback="CB" />
          <ResponseStream
            textStream={"Selamat datang di portal layanan informasi wisata kami. Kami hadir untuk memberikan panduan terbaik bagi Anda yang ingin merencanakan perjalanan yang menyenangkan dan berkesan. Dengan berbagai pilihan destinasi lokal maupun nasional, kami siap membantu Anda mengeksplorasi keindahan alam, budaya, dan kekayaan Indonesia. Silakan pilih kategori wisata yang Anda minati, dan kami akan memberikan informasi lengkapnya."}
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
            <Message className="justify-start max-w-[80%]">
              <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
                <ResponseStream
                  textStream={aiOutputs[index] || "No response from AI"}
                  mode="typewriter"
                  speed={30}
                  className="text-sm/6 bg-transparent p-0"
                />
            </Message>
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
