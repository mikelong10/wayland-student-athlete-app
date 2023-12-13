import { ServiceCardInfo } from "@components/ServicesContent";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";

export default function ServiceCard({ info }: { info: ServiceCardInfo }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <CardHeader className="flex gap-4">
          {info.icon}
          <CardTitle>{info.title}</CardTitle>
        </CardHeader>
        <Separator />
      </div>
      <CardContent>
        <p className="text-foreground-less">{info.description}</p>
      </CardContent>
    </Card>
  );
}
