import { useEffect, useState } from "react";
import styles from "./WriteLetterPage.module.scss";
import DefaultButton from "../../atoms/button/DefaultButton";
import CrayonBox20 from "../../atoms/crayonBox/CrayonBox20";
import Letter from "../../atoms/letter/Letter";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useSketchbookListAll } from "../../../hooks/sketchbook/useSketchbookList";
// import { useGetCharacterList } from "../../../hooks/character/useCharacterList";
import { getMotionSelect, postLetter } from "../../../api/Api";
import { useGetCharacterList } from "../../../hooks/character/useCharacterList";
import LNB from "../../molecules/common/LNB";
import CharacterList from "../../molecules/character/CharacterList";
// import { useGetMotionList } from "../../../hooks/motion/useGetMotionList";
import { useAlert } from "../../../hooks/notice/useAlert";
import { Page_Url } from "../../../router/Page_Url";
import MotionExample from "../../molecules/motion/MotionExample";

function LetterWritePage() {
  const sketchbookId = useParams() as { sketchbookId: string }; // 스케치북 아이디
  const [content, setContent] = useState(""); // 편지내용
  const [target, setTarget] = useState(0); // 편지보낼스케치북
  // const location = useLocation();
  // const { gif, characterNickname } = location.state || {};
  const { data: sketchbookList, isLoading } = useSketchbookListAll();
  const { data: characterList } = useGetCharacterList();
  const [characterId, setCharacterId] = useState(0);
  const [motionId, setMotionId] = useState(0);
  const [characterMotionId, setCharacterMotionId] = useState(0);
  const [gif, setGif] = useState("");
  // const { data: baseMotionList } = useGetMotionList();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (
      content &&
      (target || sketchbookId) &&
      motionId &&
      characterMotionId != 0
    ) {
      // 값 유무 확인
      postLetter(content, Number(target), characterMotionId).then((res) => {
        if (res.statusCode === 201) {
          setContent("");
          showAlert("편지를 보냈어요!");
          navigate(Page_Url.SketchbookList);
        }
      });
    } else {
      showAlert("보낼 편지를 확인해주세요");
    }
  };
  const motionSeleted = async (motionId: any) => {
    setMotionId(motionId);
    const data = await getMotionSelect(characterId, motionId);
    if (data) {
      setMotionId(motionId);
      setGif(data.data.imageUrl);
      setCharacterMotionId(data.data.characterMotionId);
      console.log(data.data);
    } else {
      console.log("No motion data available");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setTarget(sketchbookList?.data[0]?.id);
    }
  }, [isLoading]);

  useEffect(() => {
    if (sketchbookId && sketchbookId.sketchbookId && !target) {
      // URL 파라미터에서 받은 sketchbookId가 숫자 타입이라고 가정할 때
      setTarget(Number(sketchbookId.sketchbookId));
    }
  }, [sketchbookId, target]);

  return (
    <div className={styles.container}>
      <LNB>
        <h1>편지 쓰기</h1>
        <DefaultButton onClick={() => onClickHandler()} custom={true}>
          보내기
        </DefaultButton>
      </LNB>
      <nav className={styles.localMenu}>
        <DefaultButton onClick={() => onClickHandler()} custom={true}>
          <CrayonBox20>편지 쓰기</CrayonBox20>
        </DefaultButton>
      </nav>
      <section className={styles.letterBox}>
        <article>
          <figure>
            <p>캐릭터 고르기</p>
            {characterList && (
              <CharacterList
                characterList={characterList}
                characterId={characterId}
                setId={setCharacterId}
              ></CharacterList>
            )}
            {!characterList?.data?.data && (
              <div className={styles.characterList}>
                <button
                  onClick={() => navigate(Page_Url.Sketch)}
                  className={styles.buttonItem}
                >
                  내 캐릭터 그리러 가기
                </button>
              </div>
            )}
          </figure>
          <figure>
            {characterId != 0 && (
              <>
                <p>동작 고르기</p>
                <MotionExample
                  characterId={characterId}
                  setGif={setGif}
                  setMotionId={motionSeleted}
                />
              </>
            )}
          </figure>
          {/* {characterId != 0 && baseMotionList && (
            <figure>
              <p>모션선택</p>
              <div className={styles.characterList}>
                {baseMotionList?.data.map((item: any) => (
                  <DefaultButton
                    onClick={() => motionSeleted(item?.motionId)}
                    key={item?.motionId}
                    custom={true}
                  >
                    <div className={styles.characterListItem}>
                      <img
                        className={styles.characterImg}
                        src={item?.imageUrl}
                        alt=""
                      />
                      <div>{item?.name}</div>
                    </div>
                  </DefaultButton>
                ))}
              </div>
            </figure>
          )} */}

          <figure>
            <p>받을 사람</p>
            <select
              name="sendTo"
              id="sendTo"
              className={`${styles.sendList} ${styles.boxComponent}`}
              onChange={(e) => {
                setTarget(Number(e.target.value));
              }}
              value={target} // useState를 사용하여 관리되는 상태를 value로 연결합니다.
              disabled={sketchbookId ? false : true} // sketchbookList가 로드되지 않았다면 select를 비활성화합니다.
            >
              {sketchbookList?.data?.map(
                (
                  item: {
                    id: number;
                    name: string;
                    tag: number;
                    holder: { nickname: string };
                  },
                  i: number
                ) => (
                  <option value={item?.id} key={i}>
                    {item?.name} - {item?.tag} - {item?.holder?.nickname}
                  </option>
                )
              )}
            </select>
          </figure>
          <figure>
            <div>편지 내용</div>
            <textarea
              name="letterContent"
              id="letterContent"
              className={styles.letterContent}
              cols={30}
              rows={10}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </figure>
        </article>
        <div className={styles.letterSize}>
          미리보기
          <Letter content={content}></Letter>
          {gif && <img src={gif} className={`${styles.characterImg}`} />}
        </div>
      </section>
    </div>
  );
}

export default LetterWritePage;
