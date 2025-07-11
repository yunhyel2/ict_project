import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { URL } from "/config/constants";
import StatusBar from "/components/StatusBar";
import Input from "/components/Input";
import { fileToBase64 } from "/components/File";
import { updateUser, getUserByAccount } from "/services/users";


export default function MyPageUserInfo() {
    const [form, setForm] = useState({
        name: '',
        address: '',
        gender: '',
        profileImage: null
    });
    const { name, address, gender, profileImage } = form;
    const validate = name && address;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate) {
            alert("필수 항목을 입력해주세요.");
            return;
        }

        updateUser({ ...form, name, address, gender, profileImage: profileImage.base64 })
        .then(() => {
            alert("정보 수정이 완료되었습니다. 마이 페이지로 이동합니다.");
            navigate(URL.MYPAGE);
        }).catch(() => alert("회원가입에 실패했습니다."))
    };


    const handleFile = async e => {
        const { files } = e.target;
        const [file] = files;
        if (!file) return;  // 파일없음
        if (file?.size / 1024 > 500) {  // 500KB 초과
            alert("파일 사이즈는 500KB를 초과할 수 없습니다.");
            e.target.files = null;
            setForm(prev => ({ ...prev, profileImage: null }));
            return;
        }
        const base64 = await fileToBase64(file);
        setForm(prev => ({ ...prev, profileImage: { base64, name: file.name } }));
    };

    useEffect(() => {
        getUserByAccount("yunhyel2").then(({ data }) => setForm(data[0]));
    }, []);

    // if (!form.id) return null;
    return <>
        <StatusBar title="회원 정보 수정" />
        <form className="overflow-y-auto d-flex flex-column align-items-stretch" onSubmit={handleSubmit} style={{ height: '100%' }}>
            <div className="d-flex flex-column flex-grow align-items-stretch gap-20 p-4">
                <input type="text" name="id" value={form.id} hidden />
                <Input 
                    id="register_name"
                    type="text"
                    name="name"
                    label="이름"
                    placeholder="이름을 입력하세요"
                    required
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
                <div className="d-flex flex-column align-items-stretch gap-8">
                    <small>프로필 사진</small>
                    <input id="profile_image" type="file" name="profileImage" accept="image/jpg, image/png, image/jpeg" onChange={handleFile} />
                    <label htmlFor="profile_image">
                        {!profileImage && <>
                            <i className="fas fa-camera" />
                            <p>이미지를 첨부하세요 (최대 500KB)</p>
                        </>}
                        {profileImage && <>
                            <img src={profileImage.base64} width="40px" height="40px" className="border-radius-20" />
                            <p>{profileImage.name}</p>
                        </>}
                    </label>
                </div>
                <div className="d-flex flex-column align-items-stretch gap-8">
                    <small>성별</small>
                    <fieldset className="d-flex">
                        <input type="radio" id="male" value="남자" name="gender" onChange={() => setForm(prev => ({ ...prev, gender: '남자' }))} />
                        <label htmlFor="male" style={{ height: 60 }}>남자</label>
                        <input type="radio" id="female" value="여자" name="gender" onChange={() => setForm(prev => ({ ...prev, gender: '여자' }))} />
                        <label htmlFor="female" style={{ height: 60 }}>여자</label>
                    </fieldset>
                </div>
            </div>
            <button type="submit" className="btn btn-primary border-radius-0 mt-auto" style={{ height: 60 }} disabled={!validate}>{validate ? '회원가입' : '필수 사항을 전부 입력하세요'}</button>
        </form>
    </>;
}