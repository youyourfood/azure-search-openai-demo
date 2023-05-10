import { RecordFilled, Send28Filled, SparkleFilled } from "@fluentui/react-icons";
import styles from "./SpecReview.module.css";
import { QuestionInput } from "../../components/QuestionInput";
import { Stack, TextField } from "@fluentui/react";
import { useState } from "react";

const SpecReview = () => {
    const [specDetails, setSpecDetails] = useState<string>("");
    const [showNoIssues, setShowNoIssues] = useState<boolean>(false);
    const [showIssues, setShowIssues] = useState<boolean>(false);
    const [tempFlag, setTempFlag] = useState<boolean>(true);

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setSpecDetails("");
        } else if (newValue.length <= 1000) {
            setSpecDetails(newValue);
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
        }
    };

    const sendQuestion = () => {
        setShowNoIssues(tempFlag);
        setShowIssues(!tempFlag);
        setTempFlag(!tempFlag);
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatRoot}>
                <div className={styles.chatContainer}>
                    <div className={styles.chatEmptyState}>
                        <RecordFilled fontSize={"120px"} primaryFill={"rgba(115, 118, 225, 1)"} aria-hidden="true" aria-label="Chat logo" />
                        <h1 className={styles.chatEmptyStateTitle}>Submit the spec and get privacy insights</h1>
                    </div>

                    <div className={styles.chatInput}>
                        <Stack horizontal className={styles.questionInputContainer}>
                            <TextField
                                className={styles.questionInputTextArea}
                                placeholder="Enter the spec here"
                                multiline
                                resizable={false}
                                borderless
                                value={specDetails}
                                onChange={onQuestionChange}
                                onKeyDown={onEnterPress}
                            />
                            <div className={styles.questionInputButtonsContainer}>
                                <div className={`${styles.questionInputSendButton}`} aria-label="Ask question button" onClick={sendQuestion}>
                                    <Send28Filled primaryFill="rgba(115, 118, 225, 1)" />
                                </div>
                            </div>
                        </Stack>
                    </div>
                    {showNoIssues && <div>No issues found. Congratulations!</div>}
                    {showIssues && (
                        <div>
                            Found some issues. Go{" "}
                            <a href="https://privacy.microsoft.com" target="_blank">
                                here
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpecReview;
