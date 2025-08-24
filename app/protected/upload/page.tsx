// app/csv-upload/page.tsx
"use client";

import { useState } from "react";
import Papa from "papaparse";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const supabase = createClient(
  'https://cxwqehmyziqtrmkquvyw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4d3FlaG15emlxdHJta3F1dnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTU1MTIsImV4cCI6MjA2NzA5MTUxMn0.Ey1Ztfa_tjJ8i3zgADPS6p17vh_WbC6SucWgbDf_nuU'
);

export default function CsvUploadPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState<Record<string, any>[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("");
    setRows([]);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data as Record<string, any>[];

        const { error } = await supabase.from("dataset").insert(rows);

        if (error) {
          console.error(error);
          if (error.message.includes("duplicate key value")) {
            setMessage("Beberapa data memiliki id sama! periksa kembali bank datanya");
          } else if (error.message.includes("Could not find the")) {
            setMessage("Format data csv salah! periksa kembali");
          } else {
            setMessage("Gagal import: " + error.message);
          }
        } else {
          setMessage("CSV berhasil diimport!");

          const {data} = await supabase.from("upload").select("*");

          if(data) {
            setRows(data);
          }

        }

        setLoading(false);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-6">
      <Card className="w-full bg-transparent max-w-md border-none">
        <CardHeader className="border-none">
          <CardTitle className="text-md font-semibold text-center">
            Upload File
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />

          {/* <p className="flex items-center text-sm space-x-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Mengupload...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload CSV
              </>
            )}
          </p> */}
          {loading && (
            <p className="flex items-center text-sm space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Mengupload...
            </p>
          )}

          {message && (
            <p
              className={`text-sm font-medium`}
            >
              {message}
            </p>
          )}

        </CardContent>
      </Card>
          {rows.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Answer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{row.question}</TableCell>
                      <TableCell>{row.answer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
    </div>
  );
}
