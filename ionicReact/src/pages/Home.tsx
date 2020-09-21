import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonButton,
  IonToast,
} from "@ionic/react";
import React, { useState, useCallback } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [content, setContent] = useState<string>();

  const [showToast1, setShowToast1] = useState(false);

  const reset = useCallback(() => {
    setAuthor("");
    setContent("");
    setContent("");
  }, []);

  const onSave = useCallback(async () => {
    const url = "http://localhost:8080/api/v1/posts";
    try {
      await axios.post(url, {
        title,
        author,
        content,
      });
      setShowToast1(true);
      reset();
    } catch (error) {}
  }, [title, author, content, reset]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IonTitle>게시글 등록</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">제목</IonLabel>
            <IonInput
              value={title}
              placeholder="제목을 입력하세요."
              onIonChange={(e) => setTitle(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">작성자</IonLabel>
            <IonInput
              value={author}
              placeholder="작성자를 입력하세요."
              onIonChange={(e) => setAuthor(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">내용</IonLabel>
            <IonTextarea
              value={content}
              placeholder="내용을 입력하세요."
              onIonChange={(e) => setContent(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <div style={{ padding: "15px" }}>
            <Link to={"/"}>
              <IonButton color="medium">취소</IonButton>
            </Link>
            <IonButton color="success" onClick={onSave}>
              등록
            </IonButton>
          </div>
        </IonList>
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="등록되었습니다."
          duration={1000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
