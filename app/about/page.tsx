import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";

export default function About(): React.ReactElement {
  return (
    <div className="w-full flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Company Logo"
              />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">
                Acerca de Nosotros
              </CardTitle>
              <CardDescription>Innovando para un futuro mejor</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Somos una empresa dedicada a crear soluciones tecnológicas
              innovadoras que mejoran la vida de las personas. Con un equipo
              apasionado y creativo, nos esforzamos por superar los límites de
              lo posible.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Tecnología</Badge>
              <Badge variant="secondary">Innovación</Badge>
              <Badge variant="secondary">Sostenibilidad</Badge>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-2">Nuestros Valores</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Excelencia en todo lo que hacemos</li>
                <li>Compromiso con la satisfacción del cliente</li>
                <li>Responsabilidad social y ambiental</li>
                <li>Fomento de la creatividad y la colaboración</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
