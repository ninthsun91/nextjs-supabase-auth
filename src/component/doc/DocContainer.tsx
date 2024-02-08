import DocUserList from './DocUserList';

export default function DocContainer() {
  return (
    <div id="doc-container" className="border border-green-500 flex-1 flex flex-row">
      <div id="doc" className="border border-black flex flex-1">DOC</div>
      <DocUserList />
    </div>
  );
}