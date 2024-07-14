"use client";

interface ButtonProps {
  text: string;
}

export const Button = ({ text }: ButtonProps) => {
  return <button className="btn btn-outline">{text}</button>;
};
