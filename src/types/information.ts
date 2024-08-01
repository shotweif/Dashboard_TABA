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
    AliasOrigen: string;
    AliasDestino: string;
    Monto: number;
}

export interface ResultadosReportecanalesWipDiario {
    ResultadosReportecanalesWipDiario: Transaccion[];
}

export interface ClientesAtados {
    CantidadAfiliados: number;
    CantidadNoAfiliados: number;
}

export interface DataStructure {
    ResultadosReportecanalesWipDiario: Transaccion[];
    ResultadosReportecanalesWipHistorico: any[];
    ClientesAtados: ClientesAtados;
}
