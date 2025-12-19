"use client"

import { cn } from "@/lib/utils";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { downvoteProductAction, upvoteProductAction } from "@/lib/products/product-actions";
import { useOptimistic, useTransition } from "react";

export default function VotingButtons({
  hasVoted,
  voteCount : initialVoteCount,
  productId,
}: {
  hasVoted: boolean;
  voteCount: number;
  productId: number
}) {
  const [optimisticVouteCount, setOptimisticVouteCount] = useOptimistic(initialVoteCount, handleOptimisticVote)
  const [isPending, startTransition] = useTransition()

  const handleUpvote = async () => {
    startTransition(async()=>{
      setOptimisticVouteCount(1)
      await upvoteProductAction(productId);
    })
  };

  const handleDownvote = async () => {
    startTransition(async()=>{
      setOptimisticVouteCount(-1)
      await downvoteProductAction(productId);
    })
  };

  function handleOptimisticVote(initialVoteCount:number,change:number){
    return Math.max(0, initialVoteCount + change)
  }

  return (
    <div
      className="flex flex-col items-center gap-1 shrink-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('vote count');
      }}
    >
      <Button
      disabled={isPending}
        onClick={handleUpvote}
        variant="ghost"
        size="icon-sm"
        className={cn(
          "h-8 w-8 text-primary ",
          hasVoted
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-primary/10 hover:text-primary"
        )}
      >
        <ChevronUpIcon className="size-5" />
      </Button>
      <span className="text-sm font-semibold transition-colors text-foreground">
        {optimisticVouteCount}
      </span>
      <Button
      disabled={isPending}
      onClick={handleDownvote}
        variant="ghost"
        size="icon-sm"
        className={cn(
          "h-8 w-8 text-primary ",
          hasVoted ? "hover:text-destructive" : "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronDownIcon className="size-5" />
      </Button>
    </div>
  );
}
