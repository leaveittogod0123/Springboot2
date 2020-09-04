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
  IonItemDivider,
  IonTextarea,
  IonButton,
  IonIcon,
  IonToast,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState, useCallback } from "react";
import { star } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const PostUpdate: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [content, setContent] = useState<string>();

  const [showToast1, setShowToast1] = useState(false);

  const history = useHistory();

  const { id } = useParams();

  useIonViewDidEnter(async () => {
    const url = "http://localhost:8080/api/v1/posts";

    console.log(id);
    try {
      const result = await axios.get(`${url}/${id}`);
      const { data } = result;
      const { author, title, content } = data;
      setAuthor(author);
      setTitle(title);
      setContent(content);
    } catch (error) {}
  }, [id]);

  const reset = useCallback(() => {
    setAuthor("");
    setTitle("");
    setContent("");
  }, []);

  const onSave = useCallback(async () => {
    const url = "http://localhost:8080/api/v1/posts";
    try {
      const result = await axios.put(`${url}/${id}`, {
        title,
        author,
        content,
      });

      setShowToast1(true);
    } catch (error) {}
  }, [title, author, content]);

  const onCancel = useCallback(() => {
    history.push("/post");
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>게시글 수정</IonTitle>
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
            <IonButton color="medium" onClick={onCancel}>
              취소
            </IonButton>
            <IonButton color="success" onClick={onSave}>
              수정
            </IonButton>
          </div>
        </IonList>
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="수정되었습니다."
          duration={1000}
        />
      </IonContent>
    </IonPage>
  );
};

export { PostUpdate };
