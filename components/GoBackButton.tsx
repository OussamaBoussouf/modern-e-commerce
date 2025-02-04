
"use client"
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

function GoBackButton() {
    const router = useRouter();
    return (
        <button
        type="button"
        className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-md mb-3"
        onClick={() => router.back()}
      >
        <ArrowLeft size="20"/>
      </button>
    );
}

export default GoBackButton;