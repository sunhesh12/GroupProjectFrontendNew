"use client"
import MessageBox from '@/components/messagebox/view'
import { useAppControls } from '@/hooks/use-app-controls'
import React from 'react'

export default function Page() {
    const { openMessageBox, closeMessageBox } = useAppControls();
  return (
    <div>
        <h1>Test page</h1>
        <button onClick={() => {
            openMessageBox(<p>Hello world</p>);
        }}>Open messagebox</button>
    </div>
  )
}
