import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Berhasil!
              </CardTitle>
              <CardDescription>
                Akun Anda telah berhasil dibuat. Silakan periksa email Anda
                untuk mengonfirmasi akun sebelum masuk.
              </CardDescription>
            </CardHeader>
            {/* <CardContent>
              <p className="text-sm text-muted-foreground">
                Terima kasih telah mendaftar! Kami telah mengirimkan email
                konfirmasi ke alamat email yang Anda berikan. Silakan buka
                email tersebut dan ikuti instruksi untuk mengonfirmasi akun
                Anda. Setelah itu, Anda dapat masuk ke akun Anda.
              </p>
            </CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
