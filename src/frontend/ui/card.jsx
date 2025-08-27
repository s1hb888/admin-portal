import React from "react";
import { cn } from "../utils/cn";

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white text-gray-900 flex flex-col rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5 px-6 pt-6 pb-4 border-b border-gray-100",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h4
      data-slot="card-title"
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "ml-auto flex items-center gap-2 text-gray-400 hover:text-gray-600 cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 py-4 text-sm text-gray-700", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between px-6 py-4 border-t border-gray-100",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
