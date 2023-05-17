import { useState } from "react";
import { Action, ActionPanel, List, Detail, useNavigation } from "@raycast/api";
import getReplay from "./openai";

const ListPage = () => {
  const { push } = useNavigation();
  const [isLoading, setLoadingStatus] = useState(false);
  const [text, setText] = useState("");

  const onEnter = async () => {
    setLoadingStatus(true);
    const resp = await getReplay(text);
    if (resp) push(<DetailPage content={resp} />);
    else push(<DetailPage content={'API Fail.'} />);
    setLoadingStatus(false);
  };

  return (
    <List
      searchBarPlaceholder="Type Something"
      onSearchTextChange={setText}
      actions={
        <ActionPanel>
          <Action title="Send" onAction={onEnter} />
        </ActionPanel>
      }
      isLoading={isLoading}
    ></List>
  );
}

const DetailPage = ({ content }: { content: string }) => {
  return <Detail markdown={content}></Detail>;
};

export default ListPage
