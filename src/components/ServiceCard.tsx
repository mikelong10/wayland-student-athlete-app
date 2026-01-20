import type { ServiceCardInfo } from "@components/ServicesContent";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";

export default function ServiceCard({ info }: { info: ServiceCardInfo }) {
  return (
    <Card className="dark:shadow-tertiary flex flex-col gap-4 border-none shadow-xl">
      <div className="flex flex-col gap-2">
        <CardHeader className="flex gap-4">
          {info.icon}
          <CardTitle>{info.title}</CardTitle>
        </CardHeader>
        <Separator />
      </div>
      <CardContent>{info.description}</CardContent>
    </Card>
  );
}
