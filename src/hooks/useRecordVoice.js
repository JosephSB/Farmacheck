import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';

const useRecodVoice = () => {
    const [loading, setLoading] = useState(false);
    const [compatible, setCompatible] = useState(true);
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const RecordVoice = (e) =>{
        if (!browserSupportsSpeechRecognition) {
            setCompatible(false)
            setTimeout(() => {
                setCompatible(true)
            }, 3000);
        }else{
            setLoading(true)
            resetTranscript()
            SpeechRecognition.startListening()
            setTimeout(() => {
                SpeechRecognition.stopListening()
                setLoading(false)
                //search()
            }, 5000);
        }
    }

    return { transcript, RecordVoice,loading,compatible }
}

export default useRecodVoice