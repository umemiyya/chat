"use client"

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { useState } from "react"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message"

export function PromptInputBasic() {
  const [input, setInput] = useState("")
  const [, setOutput] = useState("")
  const [userInputs, ] = useState<string[]>(["user message 1", "user message 2"])
  const [aiOutputs, ] = useState<string[]>(["ai response 1", "ai response 2"])
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await fetch('/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    console.log("Response data:", data);
    if (res.status !== 200) {
      console.error("Error:", data);
      setIsLoading(false);
      return;
    }
    setOutput(data.message || "No response from AI");
    setIsLoading(false)
  }
  const handleValueChange = (value: string) => {
    setInput(value)
  }

  return (
    <div className="grid gap-4">
    {userInputs.map((userInput, index) => (
      <div key={index} className="flex flex-col gap-8">
        <Message className="justify-end text-sm">
          <MessageContent>
            {userInput}
          </MessageContent>
        </Message>
        <Message className="justify-start text-sm">
          <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
          <MessageContent markdown className="bg-transparent p-0">
            {aiOutputs[index] || "No response from AI"}
          </MessageContent>
        </Message>
      </div>
    ))}
    <PromptInput
      value={input}
      onValueChange={handleValueChange}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className="w-full max-w-(--breakpoint-md)"
    >
      <PromptInputTextarea className="text-sm" placeholder="Tanyakan terkait wisata..." />
      <PromptInputActions className="justify-end pt-2">
        <PromptInputAction
          tooltip={isLoading ? "Stop generation" : "Send message"}
        >
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {/* {isLoading ? (
              <Square className="size-5 fill-current" />
            ) : ( */}
              <ArrowUp className="size-5" />
            {/* )} */}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
    </div>
  )
}
