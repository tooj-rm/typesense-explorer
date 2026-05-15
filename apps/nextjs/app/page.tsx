"use client";

import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Database, Plug } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { SyntheticEvent } from "react";
import { useConnectStore } from "@/store/connectStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const { host, apiKey, setHost, setApiKey } = useConnectStore()
  const router = useRouter()

  const connect = async (e: SyntheticEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-border bg-card">
            <Database className="h-6 w-6 text-primary"/>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Typesense Explorer
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Connect to your Typesense cluster to browse documents.
          </p>
        </div>

        <form onSubmit={connect} className="space-y-4 rounded-lg p-6 bg-card">
          <div className="space-y-2">
            <Label htmlFor="host">Host URL</Label>
            <Input
              id="host"
              placeholder="http://localhost:8108"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Include the protocol and port if not standard</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="key">API key</Label>
            <Input
              id="key"
              placeholder="search-only or admin key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
            />
          </div>

          <Button className="w-full" onClick={connect}>
            <Plug className="h-4 w-4"/>
            Connect
          </Button>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            Credentials are stored only in your browser (localStorage). Your Typesense server must allow CORS from this
            origin.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;