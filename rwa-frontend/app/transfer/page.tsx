'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TransferPage() {
  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transfer Research Shares</h1>
        <p className="text-muted-foreground mt-2">
          Transfer your research project tokens to another wallet
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Share Transfer</CardTitle>
          <CardDescription>
            Transfer ownership of research project tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="Enter recipient's wallet address"
            />
          </div>
          <div>
            <Label htmlFor="amount">Number of Shares</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter number of tokens to transfer"
            />
          </div>
          <div>
            <Label htmlFor="project">Research Project</Label>
            <Input id="project" placeholder="Enter project token symbol" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Review Transfer</Button>
          <p className="text-sm text-muted-foreground text-center">
            Please verify all details before confirming the transfer
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}