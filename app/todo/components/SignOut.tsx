import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

function SignOut() {
  const signOut = async () => {
    "use server";
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      redirect("/auth-server-action");
    }
  };

  return (
    <form action={signOut}>
      <Button>SignOut</Button>
    </form>
  );
}

export default SignOut;
