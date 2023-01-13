import React from "react";

export const Skeleton = () => {
    return <div
        animate='pulse'
        flex='~'
        space='x-4'
    >
        <div
            border='rounded-full'
            bg='slate-200'
            h='10'
            w='10'
        />
        <div
            flex='1'
            space='y-6'
            p='y-1'
        >
            <div
                h='2'
                bg='slate-200'
                border='rounded'
            />
            <div space='y-3'>
                <div grid='~ cols-3 gap-4'>
                    <div h='2'
                         bg='slate-200'
                         border='rounded'
                         grid='col-span-2'
                    />
                    <div h='2'
                         bg='slate-200'
                         border='rounded'
                         grid='col-span-1'
                    />
                </div>
                <div
                    h='2'
                    bg='slate-200'
                    border='rounded'
                />
            </div>
        </div>
    </div>
}
