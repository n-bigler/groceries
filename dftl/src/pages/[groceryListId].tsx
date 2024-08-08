'use client';

import {useRouter} from "next/router";
import GroceryListView from "@/components/GroceryListView";

export default function GroceryListPage() {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }
  let id = router.query.groceryListId as string;
  return <GroceryListView groceryListId={id} />;
}