document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('diagnostico-form-page');
    if (!form) return;

    const interesseSelect = form.querySelector('select[name="interesse"]');
    const params = new URLSearchParams(window.location.search);
    const interesseQuery = params.get('interesse');

    if (interesseSelect && interesseQuery) {
        const normalized = interesseQuery.trim().toUpperCase();
        const hasOption = Array.from(interesseSelect.options).some((option) => option.value === normalized);
        if (hasOption) interesseSelect.value = normalized;
    }

    const WHATSAPP_NUMBER = '5535997209703';

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const nome = String(formData.get('nome') || '').trim();
        const empresa = String(formData.get('empresa') || '').trim();
        const whatsapp = String(formData.get('whatsapp') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const segmento = String(formData.get('segmento') || '').trim();
        const faturamento = String(formData.get('faturamento') || '').trim();
        const interesse = String(formData.get('interesse') || '').trim();
        const meta90Dias = String(formData.get('meta_90_dias') || '').trim();
        const desafio = String(formData.get('desafio') || '').trim();

        const message = [
            'Olá, equipe Krin.tech.',
            'Quero iniciar meu Diagnóstico Estratégico.',
            '',
            'Dados da empresa:',
            `- Nome: ${nome || '-'}`,
            `- Empresa: ${empresa || '-'}`,
            `- WhatsApp: ${whatsapp || '-'}`,
            `- E-mail: ${email || '-'}`,
            `- Segmento: ${segmento || '-'}`,
            `- Faturamento mensal: ${faturamento || '-'}`,
            `- Estrutura desejada: ${interesse || '-'}`,
            `- Meta (90 dias): ${meta90Dias || '-'}`,
            '',
            'Principal desafio:',
            desafio || '-',
            '',
            'Aguardando os próximos passos estratégicos.'
        ].join('\n');

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener');

        window.setTimeout(() => {
            form.submit();
        }, 120);
    });
});
