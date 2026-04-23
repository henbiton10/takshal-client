import { useMemo } from 'react';
import styled from 'styled-components';
import { DashboardNetwork } from './types';

// Icons
const NetworkIcon = () => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 16V15H11C10.45 15 9.97917 14.8042 9.5875 14.4125C9.19583 14.0208 9 13.55 9 13V5H7V6C7 6.55 6.80417 7.02083 6.4125 7.4125C6.02083 7.80417 5.55 8 5 8H2C1.45 8 0.979167 7.80417 0.5875 7.4125C0.195833 7.02083 0 6.55 0 6V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H5C5.55 0 6.02083 0.195833 6.4125 0.5875C6.80417 0.979167 7 1.45 7 2V3H13V2C13 1.45 13.1958 0.979167 13.5875 0.5875C13.9792 0.195833 14.45 0 15 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V6C20 6.55 19.8042 7.02083 19.4125 7.4125C19.0208 7.80417 18.55 8 18 8H15C14.45 8 13.9792 7.80417 13.5875 7.4125C13.1958 7.02083 13 6.55 13 6V5H11V13H13V12C13 11.45 13.1958 10.9792 13.5875 10.5875C13.9792 10.1958 14.45 10 15 10H18C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H15C14.45 18 13.9792 17.8042 13.5875 17.4125C13.1958 17.0208 13 16.55 13 16ZM15 6H18V2H15V6ZM15 16H18V12H15V16ZM2 6H5V2H2V6Z" fill="#F2F2F2"/>
  </svg>
);

const MatrixContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  direction: rtl;
  background: #1c2439;
`;

const Table = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
`;

const DataRow = styled.tr`
  border-top: 1px solid #305088;
  border-bottom: 1px solid #305088;
`;

const LabelCell = styled.td`
  position: sticky;
  right: 0;
  z-index: 5;
  background: rgba(41, 121, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid #305088;
  padding: 8px;
  text-align: center;
  width: 140px;
  min-width: 140px;
  color: #fafafa;
  font-size: 16px;
  font-weight: 700;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
`;

const NetworkCardCell = styled.td`
  padding: 0;
  width: 120px;
  min-width: 120px;
  height: 36px;
  border: 1px solid #305088;
  background: ${props => props.theme.customColors.status.ready};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }


  .network-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fafafa;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    padding: 0 8px;
  }
`;

const EmptyCell = styled.td`
  border: 1px solid #305088;
  background: transparent;
  width: 120px;
  min-width: 120px;
`;





const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 18px;
  width: 100%;
`;

interface Props {
  networks: DashboardNetwork[];
}

export const NetworksMatrix = ({ networks }: Props) => {
  const COLS = 3;




  // Group networks for table rows
  const networkRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < networks.length; i += COLS) {
      rows.push(networks.slice(i, i + COLS));
    }
    return rows;
  }, [networks, COLS]);

  if (networks.length === 0) {
    return (
      <MatrixContainer>
         <EmptyState>אין רשתות להצגה</EmptyState>
      </MatrixContainer>
    );
  }

  return (
    <MatrixContainer>
      <Table>
        <tbody>
          {networkRows.map((row, rowIdx) => (
            <DataRow key={rowIdx}>
              {/* Only show row header in the first row, use rowSpan */}
              {rowIdx === 0 && (
                <LabelCell rowSpan={networkRows.length}>
                  <div className="content">
                    <NetworkIcon />
                    רשתות
                  </div>
                </LabelCell>
              )}
              
              {row.map(network => (
                <NetworkCardCell key={network.id}>
                  <div className="network-card">
                    {network.name}
                  </div>
                </NetworkCardCell>
              ))}

              {/* Pad row with empty cells if not full */}
              {row.length < COLS && Array.from({ length: COLS - row.length }).map((_, i) => (
                <EmptyCell key={`empty-${i}`} />
              ))}
            </DataRow>
          ))}
        </tbody>
      </Table>
    </MatrixContainer>
  );
};
