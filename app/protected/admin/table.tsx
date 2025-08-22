// import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { createClient } from "@/lib/supabase/client";

export function TableQa({data} : {data: any[], handler: any}) {

  // const handlerDelete = async (id: string) => {
  //   if (!confirm('Yakin ingin menghapus data ini?')) return;
  //   const supabase = createClient()
  //   const { error } = await supabase
  //     .from('dataset')
  //     .delete()
  //     .eq('id', id)

  //   handler()
  //   if (error) {
  //     console.error('Error deleting data:', error)
  //     return
  //   }
  //   alert('Data berhasil dihapus')
  // }

  return (
    <Table>
      <TableCaption>List data latih</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Pertanyaan</TableHead>
          <TableHead>Jawaban</TableHead>
          {/* <TableHead className="text-right">Action</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((qa, index) => (
          <TableRow key={qa.id}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell className="font-medium">{qa.question}</TableCell>
            <TableCell>{qa.answer}</TableCell>
            {/* <TableCell className="text-right">
              <Button onClick={() => handlerDelete(qa.id)} >Hapus</Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
