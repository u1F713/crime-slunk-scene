'use client'

import {Match} from 'effect'
import {type FunctionComponent, useEffect, useRef, useState} from 'react'
import {
  codeBlockClassName,
  containerClassName,
  copyBtnClassName,
  fileLableClassName,
} from './code-block.css.ts'

type CodeBlockProps = React.ComponentProps<'pre'> & {
  'data-language': string
  'data-filename'?: string
  'data-hide-line-numbers': boolean
  children: JSX.Element
}

const CodeBlock: FunctionComponent<CodeBlockProps> = ({
  'data-language': metaLanguage,
  'data-filename': metaFilename,
  style,
  className,
  children,
  ...attr
}) => {
  const elementRef = useRef<HTMLPreElement>(null)
  const [textContent, setTextContent] = useState('')
  const lang = Match.value(metaLanguage).pipe(
    Match.when(
      lang => lang === 'sh',
      _ => 'Shell session',
    ),
    Match.orElse(lang => lang),
  )

  useEffect(() => {
    elementRef.current?.textContent &&
      setTextContent(elementRef.current.textContent)
  }, [])

  return (
    <div className={containerClassName} style={style}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <FileLabel name={metaFilename ?? lang} />
        <CopyBtn text={textContent} />
      </div>
      <pre
        className={`${className} ${codeBlockClassName}`}
        ref={elementRef}
        {...attr}
      >
        {children}
      </pre>
    </div>
  )
}

function FileLabel({name}: {name: string}) {
  return (
    <div className={fileLableClassName} style={{width: 'fit-content'}}>
      <span>{name}</span>
    </div>
  )
}

function CopyBtn({text}: {text: string}) {
  const [copied, setCopied] = useState(false)
  const [debounced, setDebounced] = useState<number | NodeJS.Timeout>()

  const handleClipboard = () => {
    const timeout = setTimeout(() => {
      setCopied(false)
    }, 600)

    setCopied(true)
    clearTimeout(debounced)
    setDebounced(timeout)
    navigator.clipboard.writeText(text)
  }

  return (
    <button
      type="button"
      onClick={handleClipboard}
      className={copyBtnClassName}
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>copied</title>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>copy</title>
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  )
}

export default CodeBlock
