"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function createTodo(title: string) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("todos")
    .insert({
      title,
    })
    .single();
  revalidatePath("/todo"); // revalidate the todo page
  return JSON.stringify(result);
}

export async function readTodo() {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("todos").select("*");
}

export async function deleteTodoById(id: string) {
  const supabase = await createSupabaseServerClient();

  await supabase.from("todos").delete().eq("id", id);
  revalidatePath("/todo"); // revalidate the todo page
}

export async function updateTodoById(id: string, completed: boolean) {
  const supabase = await createSupabaseServerClient();

  await supabase.from("todos").update({ completed }).eq("id", id);
  revalidatePath("/todo"); // revalidate the todo page
}
