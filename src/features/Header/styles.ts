import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  position: sticky;
  z-index: 50;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 56px;
  padding-inline: 16px;

  font-weight: 300;

  background: #fff;
  box-shadow: rgba(0, 0, 0, 16%) 0 1px 4px;

  @media ${({ theme }) => theme.media.md} {
    padding-inline: 4px;
  }
`

export const HeaderLeftSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const HeaderTitle = styled.span`
  font-size: 18px;
`

export const HeaderRightSection = styled.div`
  cursor: pointer;

  display: flex;
  gap: 8px;
  align-items: center;

  max-width: 180px;
  padding-block: 4px;
  padding-inline: 16px;

  border-left: 1px solid rgb(217, 217, 217);
  border-radius: 4px;

  transition: background-color ease 500ms;

  :hover {
    background-color: rgb(217, 217, 217);
  }

  @media ${({ theme }) => theme.media.md} {
    max-width: 140px;
    padding-block: 2px;
    padding-inline: 8px;
  }
`

export const HeaderProfileInfo = styled.div`
  display: flex;
  flex-direction: column;

  :nth-child(2) {
    font-size: 8px;
  }
`

export const HeaderProfileInfoName = styled.span`
  font-size: 14px;
  line-height: 100%;
`

export const HeaderProfileInfoRole = styled.span`
  font-size: 12px;
`

export const HeaderProfileAvatar = styled.img`
  width: 40px;
  height: 40px;

  object-fit: cover;
  border-radius: 50%;
`
