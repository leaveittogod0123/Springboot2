import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonList,
  useIonViewDidEnter,
  IonListHeader,
} from "@ionic/react";
import React, { useState } from "react";
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
          <IonTitle>게시글 조회</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {postList &&
            postList?.map((ele) => {
              const { id, author, title, content, modifiedDate: date } = ele;
              return (
                <IonItem key={id}>
                  <Link to={`/postUpdate/${id}`}>
                    <IonCard style={{ width: "300px" }}>
                      <IonCardHeader>
                        <IonCardSubtitle>작성자:{author}</IonCardSubtitle>
                        <IonCardTitle>제목:{title}</IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>내용:{content}</IonCardContent>
                      <IonCardContent>수정날짜: {date}</IonCardContent>
                    </IonCard>
                  </Link>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export { PostList };
