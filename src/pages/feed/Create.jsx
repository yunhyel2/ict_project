import { useRef, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import { OverlayPage } from "/components";
import { useAuth } from "/context/AuthContext";
import { fileToBase64 } from "/components/File";
import { createFeed } from "/services/feeds";
import { URL } from "/config/constants";

export default function CreateFeed() {
    const { setFeeds } = useOutletContext();
    const contentRef = useRef();
    const navigate = useNavigate();
    //<<유효성 체크 메시지 출력을 위한 State>>
    const [file, setFile] = useState({});
    const [contenteValid, setContentValid] = useState('');
    const { auth } = useAuth();

    const handleFile = async (e) => {
        const f = e.target.files[0];
        let imageBase64 = null;
        if (f) {
            imageBase64 = await fileToBase64(f);
            setFile({ name: f.name, file: imageBase64 });
        } else setFile({});
    }

    //<<게시글 등록 버튼 이벤트 처리용>>
    const handleInsert = async (e) => {
        e.preventDefault();
        const contentNode = contentRef.current;
        
        if(contentNode.value.trim()===''){
            setContentValid('내용을 입력하세요');
            contentNode.focus();
        }
        if(contentNode.value.trim()==='') return;

        const content = contentNode.value;

        // user, location 정보 추출
        const user = {
             id: auth.id,
             account: auth.account,
             name: auth.name,
            // ...필요한 필드 추가
        };
        const location = {
            id: auth.locationId, // 반드시 id가 있어야 함
            location: auth.location
        };
        // location이 null이 아니고, id/location 값이 실제로 존재하는지 확인
        if (!location.id || !location.location) {
            alert("위치 정보가 없습니다. 마이페이지에서 위치를 등록해 주세요.");
            return;
        }

        createFeed({
            content,
            image: !file ? null : file?.file,
            user,
            location
        })
        .then(data=>{
            setFeeds(prev => [data, ...prev]);  // 기존 피드 목록에 방금 추가한 피드 데이터를 추가.
            alert("피드가 생성되었습니다");
            navigate(URL.FEED, { replace: true })
        })
        .catch(err=>{
            console.log(err);
            alert("피드 생성에 실패했습니다");
        });
    };
    
    return <>
        <OverlayPage title="오늘의 피드">
            <form method="POST" className="d-flex flex-column" style={{ height: '100%' }}>
                <div className="p-3 border-bottom border-gray">
                    <textarea ref={contentRef} style={{ resize: 'none'}} className="form-control border-0" rows="18" id="feed_content" name="content" placeholder="내용을 입력하세요"></textarea>
                    <small className="text-danger">{contenteValid}</small>
                </div>
                <div className="border-bottom border-gray p-2 d-flex align-items-center" style={{ height: 80 }}>
                    <label htmlFor="feed_image" className="p-3 ps-4 d-flex align-items-center gap-20 pointer">
                        <i className="fas fa-camera" style={{ fontSize: 24 }} /> 
                        <p>{file?.name || "이미지를 첨부하세요 (최대 500KB)"}</p>
                    </label>
                    <input type="file" name="image" id="feed_image" className="invisible" accept="image/*" onChange={handleFile} />
                    {file?.file && <img src={file.file} alt="이미지 미리보기" className="border-radius-12 ms-auto me-2" width="auto" height="60px" />}
                </div>
                <button className="btn btn-primary p-3 border-radius-0 mt-auto" onClick={handleInsert}>작성하기</button>
            </form>
        </OverlayPage>
    </>
}
