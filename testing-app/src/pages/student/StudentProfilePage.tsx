import { useRef, useState } from "react";
import { LinkIcon } from "../../icons/icons";
import styled from "@emotion/styled";
import { Modal } from "../../components/modal";
import { ChangeModalPass } from "../../components/changeModalPass";
import { Toast } from "../../components/UI/Toast";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 346px 1fr;
  gap: 30px;
`;

const LinkRow = styled.a`
  display: flex;
  transition: background 0.15s, color 0.15s;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  margin: 2px 0 14px;
  gap: 8px;
  color: #09090b;

  &:hover {
    color: #0e73f6;
    text-decoration: underline;
  }
`;

const AvatarBox = styled.div`
  display: flex;
`;

const AvatarImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
`;

const InfoCol = styled.div`
  min-width: 0;
`;
const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 0 8px;
`;

const FullName = styled.span`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.35;
`;

const Project = styled.span`
  background: #e8f5ff;
  color: #4094f7;
  font-size: 12px;
  font-weight: 700;
  border-radius: 100px;
  padding: 6px 10px;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const Groups = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 50px;
`;

const MainProfileBox = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: row;
`;

const GroupElements = styled.span`
  background-color: #f4f6f8ff;
  padding: 8px;
  border-radius: 5px;
`;

const Actions = styled.div`
  display: flex;
  gap: 25px;
`;

const GroupLine = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 1.35;

  .group {
    font-weight: 600;
    color: #101828;
  }
  .course {
    color: #101828;
  }
  .vector {
    color: #101828;
  }
`;

const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid #dde2e4;
  color: #09090b;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  padding: 10px 30px;
  border-radius: 6px;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

type GroupTag = {
  group: string;
  course: string;
  vector: string;
};

type ProfileData = {
  fullname: string;
  avatar: string;
  socialLink?: { url: string; label: string };
  label: string;
  tags: GroupTag[];
};

export function StudentProfilePage() {
  const data = {
    fullname: "Elmira",
    avatar:
      "https://avatars.mds.yandex.net/i?id=9199cdc121b8c72abdd105624ef6f51a20164676-5233567-images-thumbs&n=13",
    socialLink: { url: "https://vk.com/id759401549", label: "vk.com_id123" },
    label: "КОД",
    tags: [{ group: "кф1", course: "3 course", vector: "frontend" }],
  };
  const [profile, SetProfile] = useState<ProfileData>(data);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isOpenPass, setIsOpenPass] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(true);

  function handleChangeFoto() {
    console.log("Поменять фото");
  }

  function handleChangePassword() {
    console.log("Поменять пароль");
    setIsOpenPass(true);
  }

  return (
    <MainProfileBox>
      {profile.avatar ? (
        <AvatarBox>
          <AvatarImg src={profile.avatar} alt="avatar" />
        </AvatarBox>
      ) : (
        <AvatarImg src="https://ir.ozone.ru/s3/multimedia-b/w1200/6812619491.jpg" />
      )}
      <Wrapper>
        <div>
          <InfoCol>
            <NameRow>
              <FullName>{profile.fullname}</FullName>
              <Project>{profile.label}</Project>
            </NameRow>
            <LinkRow href={profile.socialLink?.url} target="_blank">
              <LinkIcon />
              {profile.socialLink?.label}
            </LinkRow>
            <Groups>
              {profile.tags.map((tag, index) => (
                <GroupLine key={index}>
                  <GroupElements className="group">{tag.group}</GroupElements>
                  <GroupElements className="course">{tag.course}</GroupElements>
                  <GroupElements className="vector">{tag.vector}</GroupElements>
                </GroupLine>
              ))}
            </Groups>
            <Actions>
              <StyledButton onClick={() => fileRef.current?.click()}>
                Поменять фото
              </StyledButton>
              <StyledButton onClick={() => handleChangePassword()}>
                Поменять пароль
              </StyledButton>
              {/* <input ref={fileRef} type="file" style={{ display: "none" }} /> */}
              {/* <StyledButton>Поменять пароль</StyledButton> */}
            </Actions>
            <ChangeModalPass
              onSuccess={() => setIsOpenToast(true)}
              open={isOpenPass}
              onClose={() => setIsOpenPass(true)}
            />
            <Toast
              message="Сохранения изменены"
              open={isOpenToast}
              onClose={() => setIsOpenToast(false)}
            />
          </InfoCol>
        </div>

        {/* {isOpenPass && (
          <Modal
            onClose={() => setIsOpenPass(false)}
            open={isOpenPass}
            title="Сменить пароль"
          >
            <div>
              <label>
                Новый пароль
                <StyledInput
                  type="text"
                  placeholder="Введите новый пароль..."
                />
              </label>
            </div>

            <div>
              <label>
                Повторите пароль
                <StyledInput type="text" placeholder="Повторите пароль..." />
              </label>
            </div>
            <ContainerButton>
              <CancelButton>Отменить</CancelButton>
              <SaveButton>Подтвердить</SaveButton>
            </ContainerButton>
          </Modal>
        )} */}

        <ChangeModalPass open={isOpenPass} onClose={setIsOpenPass} />
      </Wrapper>
    </MainProfileBox>
  );
}
