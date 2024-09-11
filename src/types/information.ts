export interface InformationCardModel {
    title: string;
    description: string;
}

// Define the types for your data
export interface Transaccion {
    TiempoDemora: number;
    Tipo: string;
    TrxEnviadaDesdePbo: string;
    BancoOrigen: string;
    BancoDestino: string;
    CodRespuesta: string;
    FechaTrx: string;
    AliasOrigen: string | null;
    AliasDestino: string | null;
    Monto: number;
}

export interface ResultadosReporteCanalesWip {
    ResultadosReporteCanalesWip: Transaccion[];
}

export interface ClientesAtados {
    CantidadAfiliados: number;
    CantidadNoAfiliados: number;
}

export interface DataStructure {
    ResultadosReporteCanalesWip: Transaccion[];
    ResultadosReporteCanalesWipHis: Transaccion[];
    ClientesAtados: ClientesAtados;
}
