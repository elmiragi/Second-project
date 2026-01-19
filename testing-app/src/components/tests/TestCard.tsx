import type { TestItem } from "../types/testing"
import styled from "@emotion/styled";

const Card = styled.div`
display: grid;
grid-template-column: 1fr, 1fr;
`

type TestCardProps = {
    testItem: TestItem;
}
export function TestCard(props: TestCardProps) {
    return <Card>Test Card</Card>
}