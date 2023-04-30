import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Input } from '../components/Input';
import { InputButton } from '../components/InputButton';
import { Output } from '../components/Output';
import { Sources } from '../components/Sources';
import { useConversation } from '../hooks/useConversation';
import { useStream } from '../hooks/useStream';
import { title, suggestions } from '../../config';
import type { FormEventHandler, ChangeEventHandler } from 'react';

const inter = Inter({ weight: '300', subsets: ['latin'] });

export default function Main() {
  const [inputValue, setInputValue] = useState('');
  const [startStream, isStreaming, outputStream, metadata] = useStream();
  const [conversation, dispatch] = useConversation();
  const scrollableElement = useRef<HTMLDivElement>(null);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = event => {
    if (event) event.preventDefault();
    if (inputValue.trim().length > 0) dispatch({ type: 'setInput', value: inputValue });
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = event =>
    event.target instanceof HTMLInputElement && setInputValue(event.target.value);

  const toggleSuggestions = () => setSuggestionsVisible(!isSuggestionsVisible);

  useEffect(() => {
    if (outputStream.length > 0 && !isStreaming) {
      dispatch({ type: 'commit', value: outputStream, metadata });
    }
  }, [isStreaming, outputStream]);

  useEffect(() => {
    if (scrollableElement.current) {
      scrollableElement.current.scrollTop = scrollableElement.current.scrollHeight;
    }
  }, [conversation.input, outputStream, isSuggestionsVisible]);

  useEffect(() => {
    if (conversation.input.length > 0 && !isStreaming) {
      startStream(conversation.input, conversation);
      setInputValue('');
    }
  }, [conversation.input]);

  return (
    <main className={`h-screen ${inter.className}`}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="h-full relative flex flex-col justify-between">
        <header className="flex flex-row items-center justify-between py-4">
          <h1 className="text-3xl">{title}</h1>
          <a href="https://github.com/7-docs/7-docs" className="text-xs italic hover:underline">
            Powered by 7-docs
          </a>
        </header>

        <div
          className={`scrollbar scrollbar-vertical flex-grow overflow-y-auto flex flex-col gap-2 pb-2`}
          ref={scrollableElement}>
          {conversation?.history.map((interaction, index, conversation) => (
            <>
              <Input>{interaction.input}</Input>
              <Output text={interaction.output} />
              {index === conversation.length - 1 ? <Sources metadata={interaction.metadata} /> : null}
            </>
          ))}

          {conversation.input ? <Input>{conversation.input}</Input> : null}

          <Output text={outputStream} />
        </div>

        <form
          className="flex flex-col gap-4 text-xl bg-dark-gray p-4 pt-6 border-gray border-t-1 sm:border sm:border-b-0"
          onSubmit={onSubmit}>
          {isSuggestionsVisible ? (
            <ul
              className="list-disc list-inside mb-2"
              onClick={event => {
                dispatch({ type: 'setInput', value: (event.target as HTMLElement).innerText });
                toggleSuggestions();
              }}>
              {suggestions.map(suggestion => (
                <li key={suggestion}>
                  <button className="italic text-sm py-1 hover:underline">{suggestion}</button>
                </li>
              ))}
            </ul>
          ) : null}

          <input
            type="text"
            name="query"
            placeholder="Ask me something..."
            value={inputValue}
            onChange={onChange}
            className="text-darker-gray flex flex-col flex-grow px-2 py-1 border-none"
          />

          <div className="flex flex-row gap-4 justify-end">
            <button
              type="button"
              className="bg-transparent appearance-none text-xs italic text-left cursor-pointer p-0 hover:underline flex-grow"
              onClick={toggleSuggestions}>
              Need suggestions?
            </button>

            <InputButton type="reset" value="Reset" onClick={() => dispatch({ type: 'reset' })} />
            <InputButton type="submit" value="Send" />
          </div>
        </form>
      </div>
    </main>
  );
}
