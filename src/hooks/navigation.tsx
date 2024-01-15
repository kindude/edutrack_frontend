    import { useNavigate } from "react-router-dom"

    const NavigateTo = (endpoint: string) => {
        const navigate = useNavigate();
        navigate(endpoint);
    }

    export default NavigateTo;