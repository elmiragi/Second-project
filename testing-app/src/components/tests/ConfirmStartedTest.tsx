// import styled from "@emotion/styled";
// import React, { useState } from "react";
// import { Modal } from "../UI/modal";
// import { Navigate, useParams } from "react-router-dom";
// import type { Attempt, TestItem } from "../types/testing";

// const Actions = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 10px;
//   border: none;
//   width: 100%;
// `;

// // const CancelButton = styled.button`
// //   display: flex;
// //   flex: 1 1 calc(50% - 10px);
// //   justify-content: center;
// //   border: 1px solid #e5e5e5;
// //   border-radius: 6px;
// //   background: #fff;
// //   padding: 8px;
// //   cursor: pointer;
// //   transition: 0.2s ease;
// //   &:hover {
// //     background: #a7c3eeff;
// //     color: #fff;
// //   }
// // `;

// // const SendButton = styled.button`
// //   display: flex;
// //   flex: 1 1 calc(50% - 10px);
// //   justify-content: center;
// //   border: 1px solid #1b72e4ff;
// //   border-radius: 6px;
// //   background-color: #0e73f6;
// //   color: #fff;
// //   padding: 8px;
// //   cursor: pointer;
// //   transition: 0.2s ease;
// //   &:hover {
// //     background: #1b72e4ff;
// //     color: #fff;
// //   }
// // `;

// const CancelButton = styled.button`
//   border: 1px solid #e5e5e5;
//   border-radius: 6px;
//   background: #fff;
//   padding: 8px 60px;
//   cursor: pointer;
//   transition: 0.4s ease;
//   flex: 1 1 calc(50% - 10px);

//   &:hover {
//     background: #c2c2c2ff;
//     color: #ffffffff;
//   }
// `;
// const StartButton = styled.button<{ variant: "primary" | "default" }>`
//   display: flex;
//   flex: 1 1 calc(50% - 10px);
//   justify-content: center;
//   border: 1px solid #e5e5e5;
//   border-radius: 6px;
//   background: ${({ variant }) =>
//     variant === "primary" ? "#4094f7e5" : "#e5e5e5"};
//   color: #fff;
//   padding: 8px 60px;
//   transition: 0.2s ease;
//   cursor: pointer;

//   &:hover {
//     background: ${({ variant }) =>
//       variant === "default" ? "#e5e5e5" : "#0e73f6"};
//   }
// `;

// // interface ConfirmStartedModalProps {
// //   open: boolean;
// //   title?: string;
// //   confirmLabel?: string;
// //   cancelLabel?: string;
// //   onConfirm: () => void;
// //   onClose: (v: boolean) => void;
// //   children?: React.ReactNode;
// // }
// type ConfirmStartedModalProps = {
//   test: TestItem;
//   lastAttempt?: Attempt | null;
// };
// export function ConfirmStartedModal(props: ConfirmStartedModalProps) {
// //   const {
// //     open,
// //     title = "Подтвердите действие",
// //     confirmLabel = "Начать",
// //     cancelLabel = "Отмена",
// //     onConfirm,
// //     onClose,
// //     children,
// //   } = props;
//   const params = useParams();
//   const { test, lastAttempt } = props;
//   const testId = Number(params.id);

  
//   function formatMinutes(seconds?: number | null): string | null {
//     if (!seconds) return null;

//     const minutes = Math.round(seconds / 60);

//     let wordForm = "минут";

//     const lastDigit = minutes % 10;
//     const lastTwoDigits = minutes % 100;

//     if (lastDigit === 1 && lastTwoDigits !== 11) {
//       wordForm = "минута";
//     } else if (
//       lastDigit >= 2 &&
//       lastDigit <= 4 &&
//       (lastTwoDigits < 12 || lastTwoDigits > 14)
//     ) {
//       wordForm = "минуты";
//     }

//     return `${minutes} ${wordForm}`;
//   }
//    const duration = formatMinutes(test.durationSec || null);

//   const attemptsUsed = test.attempts ? test.attempts.length : 0;


//   const [showStartModal, setShowStartModal] = useState(false);

//   return (
//     <Modal
//         open={showStartModal}
//         onClose={() => setShowStartModal(false)}
//         title="Начать тест"
//         footer={
//           <div style={{ display: "flex", gap: 8 }}>
//             <button onClick={() => setShowStartModal(false)}>Отмена</button>
//             <StartButton
//               onClick={() => {
//                 setShowStartModal(false);
//                 Navigate(`/student/test/${test.id}`);
//               }}
//               variant="primary"
//             >
//               Начать
//             </StartButton>
//           </div>
//         }
//       >
//         <div>
//           <p>
//             Время на тест: <strong>{duration ?? "—"}</strong>
//           </p>
//           <p>
//             Попыток доступно: <strong>{test.attemptsAllowed ?? "—"}</strong>
//           </p>
//           <p>
//             Использовано попыток: <strong>{attemptsUsed}</strong>
//           </p>
//           <p>
//             Оставшиеся попытки: <strong>{attemptsRemaining ?? "—"}</strong>
//           </p>
//         </div>
//       </Modal>
//   );
// }
