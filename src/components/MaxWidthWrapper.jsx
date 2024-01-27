import clsx from 'clsx'
import React from 'react'

function MaxWidthWrapper(className, children) {
    return (
        <section className={clsx('max-w-screen-2xl lg:px-16 md:px-10 sm:px-6 px-4', className)}>
            {children}
        </section>
    )
}

export default MaxWidthWrapper