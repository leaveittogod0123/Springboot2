import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { Item, Label } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList: React.FC = () => {
  const [postList, setList] = useState<
    {
      id: number;
      title: string;
      author: string;
      content: string;
      modifiedDate: string;
    }[]
  >();
  useIonViewDidEnter(async () => {
    const url = "http://localhost:8080/api/v1/posts";
    try {
      const result = await axios.get(url);
      const { data } = result;
      console.log(data);
      setList(data);
    } catch (error) {}
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div
            className="columns"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IonTitle className="column">
              스프링부트로 시작하는 웹 서비스
            </IonTitle>
            <Link to={`/postInsert`}>
              <IonButton color="primary" className="column">
                글 등록
              </IonButton>
            </Link>
            <Link to={`/postInsert`}>
              <IonButton color="success" className="column">
                글 등록
              </IonButton>
            </Link>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ background: "#ffffff" }}>
          <Item.Group divided style={{ marginTop: 20 + "px" }}>
            {postList &&
              postList?.map((ele) => {
                const { id, author, title, content, modifiedDate: date } = ele;
                return (
                  <Item key={id} style={{ padding: "18px" }}>
                    <Link to={`/postUpdate/${id}`}>
                      <Item.Content>
                        <Item.Header>
                          <Item.Header>제목:{title}</Item.Header>
                        </Item.Header>
                        <Item.Meta>작성자:{author}</Item.Meta>
                        <Item.Description>내용:{content}</Item.Description>
                        <Item.Extra>
                          <Label>수정날짜: {date}</Label>
                        </Item.Extra>
                      </Item.Content>
                    </Link>
                  </Item>
                );
              })}
          </Item.Group>
        </div>
      </IonContent>
    </IonPage>
  );
};

export { PostList };
