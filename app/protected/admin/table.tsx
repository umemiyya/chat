"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Edit3, Trash2 } from "lucide-react"

export function TableQa({
  data,
  handler,
}: {
  data: any[]
  handler: () => void
}) {
  const supabase = createClient()
  const [editRow, setEditRow] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  const handlerDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return
    const { error } = await supabase.from("dataset").delete().eq("id", id)

    if (error) {
      console.error("Error deleting data:", error)
      alert("Gagal menghapus data")
      return
    }

    alert("Data berhasil dihapus")
    handler()
  }

  const handlerSaveEdit = async () => {
    if (!editRow) return
    setLoading(true)

    const { error } = await supabase
      .from("dataset")
      .update({
        question: editRow.question,
        answer: editRow.answer,
      })
      .eq("id", editRow.id)

    setLoading(false)

    if (error) {
      console.error("Error updating data:", error)
      alert("Gagal update data")
      return
    }

    alert("Data berhasil diupdate")
    setEditRow(null)
    handler()
  }

  return (
    <Table>
      <TableCaption>List data latih</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Pertanyaan</TableHead>
          <TableHead>Jawaban</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((qa, index) => (
          <TableRow key={qa.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{qa.question}</TableCell>
            <TableCell>{qa.answer}</TableCell>
            <TableCell className="flex gap-2 justify-end">
              {/* Edit Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditRow(qa)}
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Data</DialogTitle>
                  </DialogHeader>
                  {editRow && (
                    <div className="space-y-4">
                      <div>
                        <Label>Pertanyaan</Label>
                        <Input
                          value={editRow.question}
                          onChange={(e) =>
                            setEditRow({ ...editRow, question: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Jawaban</Label>
                        <Input
                          value={editRow.answer}
                          onChange={(e) =>
                            setEditRow({ ...editRow, answer: e.target.value })
                          }
                        />
                      </div>
                      <Button
                        className="w-full"
                        onClick={handlerSaveEdit}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Menyimpan...
                          </>
                        ) : (
                          "Simpan"
                        )}
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Delete Button */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handlerDelete(qa.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Hapus
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
