// ============================================================
// CONFIGURAÇÃO DAS SESSÕES DE FOTOS
//
// Para adicionar FOTOS em uma sessão existente:
//   → Basta colocar o arquivo .jpeg/.jpg/.png na pasta correspondente
//     em src/assets/<nome-da-pasta>/
//
// Para adicionar uma NOVA SESSÃO de fotos:
//   1. Crie uma nova pasta em src/assets/ e adicione as fotos
//   2. Copie o bloco "import.meta.glob" abaixo e ajuste o caminho
//   3. Copie um objeto do array photoSections e ajuste os campos
// ============================================================

// Fotos da Sessão 1 → pasta: src/assets/barracao/
const barracaoImages = Object.values(
    import.meta.glob('../assets/barracao/*.{jpeg,jpg,png}', {
        eager: true,
        query: '?url',
        import: 'default',
    })
) as string[]

// Fotos da Sessão 2 → pasta: src/assets/primeiro/
const primeiroImages = Object.values(
    import.meta.glob('../assets/primeiro/*.{jpeg,jpg,png}', {
        eager: true,
        query: '?url',
        import: 'default',
    })
) as string[]

// Fotos da Sessão 3 → pasta: src/assets/selfie/
const selfieImages = Object.values(
    import.meta.glob('../assets/selfie/*.{jpeg,jpg,png}', {
        eager: true,
        query: '?url',
        import: 'default',
    })
) as string[]

export interface PhotoSectionData {
    id: string
    title: string
    description: string
    images: string[]
    highlightCount: number // Quantas fotos aparecem em destaque (sem abrir modal)
}

// ============================================================
// Para adicionar uma nova sessão: copie e cole um bloco abaixo
// ============================================================
export const photoSections: PhotoSectionData[] = [
    {
        id: 'sessao1',
        title: 'Foto - Sessão 1',
        // Texto descritivo da sessão — altere conforme necessário
        description:
            'Realizamos instalações e manutenções em ambientes industriais e comerciais de grande porte. Nossos técnicos garantem que cada equipamento opere com máxima eficiência, assegurando conforto térmico e a vida útil dos sistemas.',
        images: barracaoImages,
        highlightCount: 3,
    },
    {
        id: 'sessao2',
        title: 'Foto - Sessão 2',
        description:
            'Do lado externo ao conforto interno, cuidamos de cada detalhe com atenção e precisão. Nossas instalações seguem rigorosos padrões técnicos para garantir a melhor circulação e qualidade do ar em qualquer ambiente.',
        images: primeiroImages,
        highlightCount: 3,
    },
    {
        id: 'sessao3',
        title: 'Foto - Sessão 3',
        description:
            'Conheça a equipe por trás de cada serviço. Profissionais comprometidos e apaixonados pelo que fazem, prontos para atender com pontualidade, respeito e excelência técnica.',
        images: selfieImages,
        highlightCount: 3,
    },
]
