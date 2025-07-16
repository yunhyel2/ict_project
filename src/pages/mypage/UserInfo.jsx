import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { URL } from "/config/constants";
import { useAuth } from "/context/AuthContext";
import StatusBar from "/components/StatusBar";
import { getMyAddressNow } from "/components/Map";
import Input from "/components/Input";
import { fileToBase64 } from "/components/File";
import { updateUser, getUserByAccount } from "/services/users";
import ResignBtn from "/pages/login/ResignBtn";


export default function MyPageUserInfo() {
    const { auth: { location, ...auth }, fetchAuth } = useAuth();
    const [filename, setFileName] = useState('');
    const [form, setForm] = useState({ ...auth, address: location });
    const { account, name, address, gender, profileImage } = form;
    const validate = name && address;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate) {
            alert("필수 항목을 입력해주세요.");
            return;
        }

        updateUser({ ...form, name, address, gender, profileImage })
        .then(user => {
            fetchAuth(user);    // context 정보 업데이트
            alert("정보 수정이 완료되었습니다. 마이 페이지로 이동합니다.");
            navigate(URL.MYPAGE);
        }).catch(() => alert("회원 정보 수정에 실패했습니다."))
    };


    const handleFile = async e => {
        const { files } = e.target;
        const [file] = files;
        if (!file) return;  // 파일없음
        if (file?.size / 1024 > 500) {  // 500KB 초과
            alert("파일 사이즈는 500KB를 초과할 수 없습니다.");
            e.target.files = null;
            setFileName('');
            setForm(prev => ({ ...prev, profileImage: auth.profileImage }));
            return;
        }
        const base64 = await fileToBase64(file);
        setFileName(file.name);
        setForm(prev => ({ ...prev, profileImage: base64 }));
    };

    const changeAddress = () => {
        getMyAddressNow(({ address: adrs }) => {
            setForm(prev => ({ ...prev, address: adrs }));
        });
    };
    
    const revertAddress = () => setForm(prev => ({ ...prev, address: location }));

    useEffect(() => {
        getUserByAccount(account).then(({ location, ...data }) => {
            if (data?.id) setForm({ ...data, address: location.location });
        });
    }, []);

    // if (!form.id) return null;
    return <>
        <StatusBar title="회원 정보 수정" />
        <form className="overflow-y-auto d-flex flex-column align-items-stretch" onSubmit={handleSubmit} style={{ height: '100%' }}>
            <div className="d-flex flex-column flex-grow align-items-stretch gap-20 p-4 mt-3">
                <input type="text" name="id" value={form.id} hidden />
                <Input 
                    id="user_name"
                    type="text"
                    name="name"
                    label="이름"
                    placeholder="이름을 입력하세요"
                    required
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
                <div className="position-relative">
                    <Input id="user_address" label="동네" type="text" name="address" value={form.address} required readOnly />
                    <div className="d-flex gap-8 position-absolute" style={{ top: '50%', right: 12, transform: 'translateY(-50%)' }}>
                        <button type="button" className="btn btn-none p-1" onClick={changeAddress}><i className="fas fa-location-crosshairs text-gray" style={{ fontSize: 20 }} /></button>
                        <button type="button" className="btn btn-none p-1" onClick={revertAddress}><i className="fas fa-reply text-gray" style={{ fontSize: 20 }} /></button>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-8">
                    <div className="d-flex flex-grow flex-column align-items-stretch gap-8">
                        <small>프로필 사진</small>
                        <input id="profile_image" type="file" name="profileImage" accept="image/jpg, image/png, image/jpeg" onChange={handleFile} />
                        <label htmlFor="profile_image">
                            <i className="fas fa-camera" />
                            <p>{filename || '이미지를 첨부하세요 (최대 500KB)'}</p>
                        </label>
                    </div>
                    {profileImage && <img src={profileImage} width="90px" height="90px" className="border border-gray border-radius-20" />}
                </div>
                <div className="d-flex flex-column align-items-stretch gap-8">
                    <small>성별</small>
                    <fieldset className="d-flex">
                        <input type="radio" id="male" value="남자" name="gender" checked={gender === '남자'} onChange={() => setForm(prev => ({ ...prev, gender: '남자' }))} />
                        <label htmlFor="male" style={{ height: 60 }}>남자</label>
                        <input type="radio" id="female" value="여자" name="gender" checked={gender === '여자'} onChange={() => setForm(prev => ({ ...prev, gender: '여자' }))} />
                        <label htmlFor="female" style={{ height: 60 }}>여자</label>
                    </fieldset>
                </div>
            </div>
            <ResignBtn />
            <button type="submit" className="btn btn-primary border-radius-0 mt-auto" style={{ height: 60, minHeight: 60 }} disabled={!validate}>{validate ? '회원 정보 수정' : '필수 사항을 전부 입력하세요'}</button>
        </form>
    </>;
}