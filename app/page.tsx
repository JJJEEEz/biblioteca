"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Search,
  Plus,
  AlertTriangle,
  Filter,
  BarChart3,
  PieChart,
  Calendar,
  Mail,
  MapPin,
  Star,
  Eye,
  Edit,
  RefreshCw,
  CheckCircle,
  XCircle,
  BookMarked,
  UserCheck,
  Timer,
  Award,
} from "lucide-react"

// Datos completos basados en tu base de datos
const estadisticasIniciales = {
  totalUsuarios: 10,
  usuariosConPrestamo: 10,
  totalLibros: 20,
  librosPrestados: 6,
  librosDisponibles: 14,
  prestamosHoy: 3,
  devolucionesHoy: 2,
  librosVencidos: 1,
}

// Todos los libros de tu base de datos
const librosIniciales = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    categoria: "Novela",
    disponible: true,
    prestamos: 2,
    rating: 4.8,
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    categoria: "Distopía",
    disponible: true,
    prestamos: 2,
    rating: 4.9,
  },
  {
    id: 3,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    categoria: "Clásico",
    disponible: false,
    prestamos: 2,
    rating: 4.7,
  },
  {
    id: 4,
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    categoria: "Suspenso",
    disponible: true,
    prestamos: 2,
    rating: 4.2,
  },
  {
    id: 5,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    categoria: "Programación",
    disponible: true,
    prestamos: 2,
    rating: 4.6,
  },
  {
    id: 6,
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    categoria: "Historia",
    disponible: true,
    prestamos: 1,
    rating: 4.5,
  },
  {
    id: 7,
    titulo: "La Odisea",
    autor: "Homero",
    categoria: "Épico",
    disponible: false,
    prestamos: 2,
    rating: 4.4,
  },
  {
    id: 8,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    categoria: "Fantasía",
    disponible: true,
    prestamos: 1,
    rating: 4.9,
  },
  {
    id: 9,
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    categoria: "Fantasía",
    disponible: true,
    prestamos: 1,
    rating: 4.8,
  },
  {
    id: 10,
    titulo: "Fundación",
    autor: "Isaac Asimov",
    categoria: "Ciencia Ficción",
    disponible: false,
    prestamos: 2,
    rating: 4.6,
  },
  {
    id: 11,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    categoria: "Novela",
    disponible: true,
    prestamos: 1,
    rating: 4.3,
  },
  {
    id: 12,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    categoria: "Distopía",
    disponible: true,
    prestamos: 1,
    rating: 4.4,
  },
  {
    id: 13,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Infantil",
    disponible: true,
    prestamos: 1,
    rating: 4.7,
  },
  {
    id: 14,
    titulo: "Crónica de una muerte anunciada",
    autor: "García Márquez",
    categoria: "Novela",
    disponible: false,
    prestamos: 2,
    rating: 4.5,
  },
  {
    id: 15,
    titulo: "El Alquimista",
    autor: "Paulo Coelho",
    categoria: "Ficción",
    disponible: true,
    prestamos: 1,
    rating: 4.1,
  },
  {
    id: 16,
    titulo: "Ángeles y Demonios",
    autor: "Dan Brown",
    categoria: "Suspenso",
    disponible: true,
    prestamos: 1,
    rating: 4.0,
  },
  {
    id: 17,
    titulo: "El arte de la guerra",
    autor: "Sun Tzu",
    categoria: "Estrategia",
    disponible: true,
    prestamos: 1,
    rating: 4.2,
  },
  {
    id: 18,
    titulo: "La Divina Comedia",
    autor: "Dante Alighieri",
    categoria: "Clásico",
    disponible: false,
    prestamos: 2,
    rating: 4.6,
  },
  {
    id: 19,
    titulo: "Hamlet",
    autor: "Shakespeare",
    categoria: "Tragedia",
    disponible: true,
    prestamos: 1,
    rating: 4.5,
  },
  {
    id: 20,
    titulo: "Cálculo Infinitesimal",
    autor: "Tom Apostol",
    categoria: "Matemáticas",
    disponible: true,
    prestamos: 1,
    rating: 4.3,
  },
]

// Todos los usuarios de tu base de datos
const usuariosIniciales = [
  {
    id: 1,
    nombre: "Fernely Flores",
    correo: "fernely@example.com",
    prestamos: 3,
    estado: "Activo",
    direccion: "Av. Universidad 123, CDMX",
    fechaRegistro: "2023-01-12",
  },
  {
    id: 2,
    nombre: "Ana López",
    correo: "ana.lopez@example.com",
    prestamos: 3,
    estado: "Activo",
    direccion: "Calle Reforma 456, CDMX",
    fechaRegistro: "2023-02-10",
  },
  {
    id: 3,
    nombre: "Carlos Ruiz",
    correo: "carlos.ruiz@example.com",
    prestamos: 3,
    estado: "Activo",
    direccion: "Blvd. Insurgentes 789, CDMX",
    fechaRegistro: "2023-03-05",
  },
  {
    id: 4,
    nombre: "Lucía Márquez",
    correo: "lucia.m@example.com",
    prestamos: 3,
    estado: "Retraso",
    direccion: "Av. Juárez 321, CDMX",
    fechaRegistro: "2023-04-21",
  },
  {
    id: 5,
    nombre: "Pedro Sánchez",
    correo: "pedro.s@example.com",
    prestamos: 3,
    estado: "Activo",
    direccion: "Calle Madero 654, CDMX",
    fechaRegistro: "2023-05-14",
  },
  {
    id: 6,
    nombre: "Valeria Torres",
    correo: "valeria.t@example.com",
    prestamos: 3,
    estado: "Activo",
    direccion: "Av. Revolución 987, CDMX",
    fechaRegistro: "2023-06-17",
  },
  {
    id: 7,
    nombre: "Miguel Ángel",
    correo: "miguel.a@example.com",
    prestamos: 2,
    estado: "Activo",
    direccion: "Calle Hidalgo 234, CDMX",
    fechaRegistro: "2023-07-23",
  },
  {
    id: 8,
    nombre: "Julia Ramírez",
    correo: "julia.r@example.com",
    prestamos: 2,
    estado: "Activo",
    direccion: "Av. Constituyentes 567, CDMX",
    fechaRegistro: "2023-08-01",
  },
  {
    id: 9,
    nombre: "Iván Castillo",
    correo: "ivan.c@example.com",
    prestamos: 2,
    estado: "Activo",
    direccion: "Blvd. Tlalpan 890, CDMX",
    fechaRegistro: "2023-08-15",
  },
  {
    id: 10,
    nombre: "Laura Gómez",
    correo: "laura.g@example.com",
    prestamos: 2,
    estado: "Activo",
    direccion: "Calle Morelos 345, CDMX",
    fechaRegistro: "2023-09-10",
  },
]

// Préstamos activos basados en tu base de datos
const prestamosActivosIniciales = [
  {
    id: 3,
    libro: "Fundación",
    usuario: "Carlos Ruiz",
    fechaPrestamo: "2024-06-10",
    fechaVencimiento: "2024-06-24",
    diasRetraso: 31,
    estado: "prestado",
  },
  {
    id: 4,
    libro: "Crónica de una muerte anunciada",
    usuario: "Lucía Márquez",
    fechaPrestamo: "2024-06-15",
    fechaVencimiento: "2024-06-29",
    diasRetraso: 26,
    estado: "prestado",
  },
  {
    id: 6,
    libro: "Don Quijote de la Mancha",
    usuario: "Valeria Torres",
    fechaPrestamo: "2024-07-02",
    fechaVencimiento: "2024-07-16",
    diasRetraso: 9,
    estado: "prestado",
  },
  {
    id: 7,
    libro: "La Odisea",
    usuario: "Miguel Ángel",
    fechaPrestamo: "2024-07-03",
    fechaVencimiento: "2024-07-17",
    diasRetraso: 8,
    estado: "retrasado",
  },
  {
    id: 8,
    libro: "Crónica de una muerte anunciada",
    usuario: "Julia Ramírez",
    fechaPrestamo: "2024-07-05",
    fechaVencimiento: "2024-07-19",
    diasRetraso: 6,
    estado: "prestado",
  },
  {
    id: 9,
    libro: "Fundación",
    usuario: "Iván Castillo",
    fechaPrestamo: "2024-07-06",
    fechaVencimiento: "2024-07-20",
    diasRetraso: 5,
    estado: "prestado",
  },
  {
    id: 10,
    libro: "La Divina Comedia",
    usuario: "Laura Gómez",
    fechaPrestamo: "2024-07-07",
    fechaVencimiento: "2024-07-21",
    diasRetraso: 4,
    estado: "retrasado",
  },
  {
    id: 13,
    libro: "El código Da Vinci",
    usuario: "Carlos Ruiz",
    fechaPrestamo: "2024-07-10",
    fechaVencimiento: "2024-07-24",
    diasRetraso: 1,
    estado: "prestado",
  },
  {
    id: 14,
    libro: "Clean Code",
    usuario: "Lucía Márquez",
    fechaPrestamo: "2024-07-11",
    fechaVencimiento: "2024-07-25",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 15,
    libro: "Sapiens",
    usuario: "Pedro Sánchez",
    fechaPrestamo: "2024-07-12",
    fechaVencimiento: "2024-07-26",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 16,
    libro: "Harry Potter y la piedra filosofal",
    usuario: "Valeria Torres",
    fechaPrestamo: "2024-07-13",
    fechaVencimiento: "2024-07-27",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 17,
    libro: "El Señor de los Anillos",
    usuario: "Miguel Ángel",
    fechaPrestamo: "2024-07-14",
    fechaVencimiento: "2024-07-28",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 18,
    libro: "Rayuela",
    usuario: "Julia Ramírez",
    fechaPrestamo: "2024-07-15",
    fechaVencimiento: "2024-07-29",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 19,
    libro: "Fahrenheit 451",
    usuario: "Iván Castillo",
    fechaPrestamo: "2024-07-16",
    fechaVencimiento: "2024-07-30",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 20,
    libro: "El Principito",
    usuario: "Laura Gómez",
    fechaPrestamo: "2024-07-17",
    fechaVencimiento: "2024-07-31",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 21,
    libro: "El Alquimista",
    usuario: "Fernely Flores",
    fechaPrestamo: "2024-07-18",
    fechaVencimiento: "2024-08-01",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 22,
    libro: "Ángeles y Demonios",
    usuario: "Ana López",
    fechaPrestamo: "2024-07-19",
    fechaVencimiento: "2024-08-02",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 23,
    libro: "El arte de la guerra",
    usuario: "Carlos Ruiz",
    fechaPrestamo: "2024-07-20",
    fechaVencimiento: "2024-08-03",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 24,
    libro: "Hamlet",
    usuario: "Lucía Márquez",
    fechaPrestamo: "2024-07-21",
    fechaVencimiento: "2024-08-04",
    diasRetraso: 0,
    estado: "prestado",
  },
  {
    id: 25,
    libro: "Cálculo Infinitesimal",
    usuario: "Pedro Sánchez",
    fechaPrestamo: "2024-07-22",
    fechaVencimiento: "2024-08-05",
    diasRetraso: 0,
    estado: "prestado",
  },
]

const categorias = [
  "Todas",
  "Novela",
  "Distopía",
  "Clásico",
  "Suspenso",
  "Programación",
  "Historia",
  "Épico",
  "Fantasía",
  "Ciencia Ficción",
  "Infantil",
  "Ficción",
  "Estrategia",
  "Tragedia",
  "Matemáticas",
]

export default function BibliotecaDashboard() {
  // Estados principales
  const [libros, setLibros] = useState(librosIniciales)
  const [usuarios, setUsuarios] = useState(usuariosIniciales)
  const [prestamosActivos, setPrestamosActivos] = useState(prestamosActivosIniciales)
  const [estadisticas, setEstadisticas] = useState(estadisticasIniciales)

  // Estados de UI
  const [busqueda, setBusqueda] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas")
  const [vistaLibros, setVistaLibros] = useState<"grid" | "list">("grid")
  const [libroSeleccionado, setLibroSeleccionado] = useState<any>(null)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>(null)
  const [modalAgregarLibro, setModalAgregarLibro] = useState(false)
  const [modalAgregarUsuario, setModalAgregarUsuario] = useState(false)
  const [modalPrestarLibro, setModalPrestarLibro] = useState(false)
  const [libroParaPrestar, setLibroParaPrestar] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("libros")

  // Agregar estos nuevos estados después de los estados existentes (línea ~200):
  const [modalEditarLibro, setModalEditarLibro] = useState(false)
  const [modalEditarUsuario, setModalEditarUsuario] = useState(false)
  const [libroParaEditar, setLibroParaEditar] = useState<any>(null)
  const [usuarioParaEditar, setUsuarioParaEditar] = useState<any>(null)

  // Estados para formularios
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    disponible: true,
  })
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    direccion: "",
  })
  const [usuarioSeleccionadoPrestamo, setUsuarioSeleccionadoPrestamo] = useState("")

  const { toast } = useToast()

  // Función para actualizar estadísticas
  const actualizarEstadisticas = (nuevosLibros: any[], nuevosPrestamos: any[]) => {
    const librosDisponibles = nuevosLibros.filter((libro) => libro.disponible).length
    const librosPrestados = nuevosLibros.filter((libro) => !libro.disponible).length
    const librosVencidos = nuevosPrestamos.filter((p) => p.diasRetraso > 0).length

    setEstadisticas({
      ...estadisticas,
      librosDisponibles,
      librosPrestados,
      librosVencidos,
    })
  }

  // Filtrado de libros
  const librosFiltrados = useMemo(() => {
    return libros.filter((libro) => {
      const coincideBusqueda =
        libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.autor.toLowerCase().includes(busqueda.toLowerCase())
      const coincideCategoria = categoriaFiltro === "Todas" || libro.categoria === categoriaFiltro
      return coincideBusqueda && coincideCategoria
    })
  }, [busqueda, categoriaFiltro, libros])

  // Función para agregar libro
  const handleAgregarLibro = () => {
    if (!nuevoLibro.titulo || !nuevoLibro.autor || !nuevoLibro.categoria) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    const libroNuevo = {
      id: Math.max(...libros.map((l) => l.id)) + 1,
      titulo: nuevoLibro.titulo,
      autor: nuevoLibro.autor,
      categoria: nuevoLibro.categoria,
      disponible: nuevoLibro.disponible,
      prestamos: 0,
      rating: 4.0,
    }

    const nuevosLibros = [...libros, libroNuevo]
    setLibros(nuevosLibros)
    actualizarEstadisticas(nuevosLibros, prestamosActivos)

    toast({
      title: "Libro agregado",
      description: `"${nuevoLibro.titulo}" ha sido agregado exitosamente al catálogo.`,
    })

    setNuevoLibro({ titulo: "", autor: "", categoria: "", disponible: true })
    setModalAgregarLibro(false)
  }

  // Función para agregar usuario
  const handleAgregarUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.correo) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    const usuarioNuevo = {
      id: Math.max(...usuarios.map((u) => u.id)) + 1,
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      direccion: nuevoUsuario.direccion,
      prestamos: 0,
      estado: "Activo",
      fechaRegistro: new Date().toISOString().split("T")[0],
    }

    setUsuarios([...usuarios, usuarioNuevo])

    toast({
      title: "Usuario registrado",
      description: `${nuevoUsuario.nombre} ha sido registrado exitosamente.`,
    })

    setNuevoUsuario({ nombre: "", correo: "", direccion: "" })
    setModalAgregarUsuario(false)
  }

  // Función para prestar libro
  const handlePrestarLibro = () => {
    if (!usuarioSeleccionadoPrestamo) {
      toast({
        title: "Error",
        description: "Por favor selecciona un usuario para el préstamo.",
        variant: "destructive",
      })
      return
    }

    const usuario = usuarios.find((u) => u.id.toString() === usuarioSeleccionadoPrestamo)
    if (!usuario || usuario.estado !== "Activo") {
      toast({
        title: "Error",
        description: "El usuario seleccionado no está activo.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      // Actualizar disponibilidad del libro
      const nuevosLibros = libros.map((libro) =>
        libro.id === libroParaPrestar.id ? { ...libro, disponible: false, prestamos: libro.prestamos + 1 } : libro,
      )

      // Crear nuevo préstamo
      const fechaHoy = new Date()
      const fechaVencimiento = new Date(fechaHoy)
      fechaVencimiento.setDate(fechaVencimiento.getDate() + 14)

      const nuevoPrestamo = {
        id: Math.max(...prestamosActivos.map((p) => p.id)) + 1,
        libro: libroParaPrestar.titulo,
        usuario: usuario.nombre,
        fechaPrestamo: fechaHoy.toISOString().split("T")[0],
        fechaVencimiento: fechaVencimiento.toISOString().split("T")[0],
        diasRetraso: 0,
        estado: "prestado",
      }

      const nuevosPrestamos = [...prestamosActivos, nuevoPrestamo]

      setLibros(nuevosLibros)
      setPrestamosActivos(nuevosPrestamos)
      actualizarEstadisticas(nuevosLibros, nuevosPrestamos)

      toast({
        title: "Préstamo registrado",
        description: `El libro "${libroParaPrestar.titulo}" ha sido prestado a ${usuario.nombre}.`,
      })

      setIsLoading(false)
      setModalPrestarLibro(false)
      setLibroParaPrestar(null)
      setUsuarioSeleccionadoPrestamo("")
    }, 1000)
  }

  // Función para procesar devolución
  const handleDevolverLibro = (prestamo: any) => {
    setIsLoading(true)

    setTimeout(() => {
      // Remover préstamo de la lista
      const nuevosPrestamos = prestamosActivos.filter((p) => p.id !== prestamo.id)

      // Actualizar disponibilidad del libro
      const nuevosLibros = libros.map((libro) =>
        libro.titulo === prestamo.libro ? { ...libro, disponible: true } : libro,
      )

      setPrestamosActivos(nuevosPrestamos)
      setLibros(nuevosLibros)
      actualizarEstadisticas(nuevosLibros, nuevosPrestamos)

      toast({
        title: "Devolución procesada",
        description: `El libro "${prestamo.libro}" ha sido devuelto exitosamente.`,
      })

      setIsLoading(false)
    }, 1000)
  }

  // Agregar estas nuevas funciones después de handleDevolverLibro:

  // Función para editar libro
  const handleEditarLibro = () => {
    if (!libroParaEditar.titulo || !libroParaEditar.autor || !libroParaEditar.categoria) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    const nuevosLibros = libros.map((libro) => (libro.id === libroParaEditar.id ? { ...libroParaEditar } : libro))

    setLibros(nuevosLibros)
    actualizarEstadisticas(nuevosLibros, prestamosActivos)

    toast({
      title: "Libro actualizado",
      description: `"${libroParaEditar.titulo}" ha sido actualizado exitosamente.`,
    })

    setModalEditarLibro(false)
    setLibroParaEditar(null)
    setLibroSeleccionado(null)
  }

  // Función para editar usuario
  const handleEditarUsuario = () => {
    if (!usuarioParaEditar.nombre || !usuarioParaEditar.correo) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    const nuevosUsuarios = usuarios.map((usuario) =>
      usuario.id === usuarioParaEditar.id ? { ...usuarioParaEditar } : usuario,
    )

    setUsuarios(nuevosUsuarios)

    toast({
      title: "Usuario actualizado",
      description: `${usuarioParaEditar.nombre} ha sido actualizado exitosamente.`,
    })

    setModalEditarUsuario(false)
    setUsuarioParaEditar(null)
    setUsuarioSeleccionado(null)
  }

  const StatCard = ({ title, value, subtitle, icon: Icon, gradient, trend, onClick }: any) => (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${gradient} text-white group`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent group-hover:from-white/30 transition-all duration-300" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
          {title}
        </CardTitle>
        <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12">
          <Icon className="h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 origin-left">
          {value}
        </div>
        <p className="text-sm opacity-80 flex items-center gap-1 group-hover:opacity-100 transition-opacity">
          {trend && <TrendingUp className="h-4 w-4 animate-pulse" />}
          {subtitle}
        </p>
        <div className="mt-3 flex items-center text-xs opacity-70 group-hover:opacity-100 transition-opacity">
          <span>Click para ver detalles</span>
          <svg
            className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )

  // Agregar estilos CSS personalizados
  const customStyles = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
    }
  `

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="container mx-auto p-6 space-y-8">
        {/* Header mejorado */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl animate-pulse">
              <BookOpen className="h-14 w-14 text-white" />
            </div>
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                Biblioteca
              </h1>
              <p className="text-2xl text-gray-600 mt-3 font-light">Sistema Inteligente de Gestión Bibliotecaria</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Calendar className="h-4 w-4" />
              <span>Hoy: {new Date().toLocaleDateString("es-ES")}</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>
        </div>

        {/* Estadísticas mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Usuarios"
            value={estadisticas.totalUsuarios}
            subtitle={`${estadisticas.usuariosConPrestamo} con préstamos activos`}
            icon={Users}
            gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
            trend={true}
            onClick={() => setActiveTab("usuarios")}
          />
          <StatCard
            title="Libros Disponibles"
            value={estadisticas.librosDisponibles}
            subtitle={`de ${estadisticas.totalLibros} libros totales`}
            icon={BookOpen}
            gradient="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700"
            onClick={() => setActiveTab("libros")}
          />
          <StatCard
            title="En Préstamo"
            value={estadisticas.librosPrestados}
            subtitle={`${Math.round((estadisticas.librosPrestados / estadisticas.totalLibros) * 100)}% del inventario`}
            icon={Clock}
            gradient="bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600"
            onClick={() => setActiveTab("libros")}
          />
          <StatCard
            title="Préstamos Activos"
            value={prestamosActivos.length}
            subtitle={`${prestamosActivos.filter((p) => p.diasRetraso > 0).length} con retraso`}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700"
            trend={true}
            onClick={() => setActiveTab("prestamos")}
          />
        </div>

        {/* Alertas importantes */}
        {prestamosActivos.filter((p) => p.diasRetraso > 0).length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">
                  ¡Atención! Hay {prestamosActivos.filter((p) => p.diasRetraso > 0).length} libro(s) con retraso en
                  devolución
                </p>
                <p className="text-sm text-red-600">Revisa la sección de préstamos para más detalles</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contenido principal mejorado */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-white shadow-sm">
            <TabsTrigger
              value="libros"
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <BookMarked className="h-4 w-4" />
              Libros ({libros.length})
            </TabsTrigger>
            <TabsTrigger
              value="usuarios"
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <UserCheck className="h-4 w-4" />
              Usuarios ({usuarios.length})
            </TabsTrigger>
            <TabsTrigger
              value="prestamos"
              className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <Timer className="h-4 w-4" />
              Préstamos ({prestamosActivos.length})
            </TabsTrigger>
            <TabsTrigger
              value="reportes"
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="libros" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">Catálogo de Libros</CardTitle>
                    <CardDescription className="text-blue-100">
                      {libros.length} libros registrados en el sistema
                    </CardDescription>
                  </div>
                  <Dialog open={modalAgregarLibro} onOpenChange={setModalAgregarLibro}>
                    <DialogTrigger asChild>
                      <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Libro
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Libro</DialogTitle>
                        <DialogDescription>
                          Completa la información del libro para agregarlo al catálogo
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="titulo">Título *</Label>
                          <Input
                            id="titulo"
                            placeholder="Título del libro"
                            value={nuevoLibro.titulo}
                            onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="autor">Autor *</Label>
                          <Input
                            id="autor"
                            placeholder="Nombre del autor"
                            value={nuevoLibro.autor}
                            onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="categoria">Categoría *</Label>
                          <Select
                            value={nuevoLibro.categoria}
                            onValueChange={(value) => setNuevoLibro({ ...nuevoLibro, categoria: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {categorias.slice(1).map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="disponibilidad">Disponibilidad</Label>
                          <Select
                            value={nuevoLibro.disponible.toString()}
                            onValueChange={(value) => setNuevoLibro({ ...nuevoLibro, disponible: value === "true" })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Estado del libro" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Disponible</SelectItem>
                              <SelectItem value="false">No disponible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setModalAgregarLibro(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAgregarLibro}>Agregar Libro</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Controles de búsqueda y filtros */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por título o autor..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
                    <SelectTrigger className="w-48 h-12">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button
                      variant={vistaLibros === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setVistaLibros("grid")}
                      className="h-12 w-12"
                    >
                      <PieChart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={vistaLibros === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setVistaLibros("list")}
                      className="h-12 w-12"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Vista de libros */}
                {vistaLibros === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {librosFiltrados.map((libro) => (
                      <Card
                        key={libro.id}
                        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-blue-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1" onClick={() => setLibroSeleccionado(libro)}>
                                <Eye className="h-3 w-3 mr-1" />
                                Ver
                              </Button>
                              {libro.disponible && (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => {
                                    setLibroParaPrestar(libro)
                                    setModalPrestarLibro(true)
                                  }}
                                >
                                  Prestar
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {libro.titulo}
                            </h3>
                            <p className="text-sm text-gray-600">por {libro.autor}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {libro.categoria}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">{libro.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                              <Badge variant={libro.disponible ? "default" : "destructive"} className="text-xs">
                                {libro.disponible ? "Disponible" : "Prestado"}
                              </Badge>
                              <span className="text-xs text-gray-500">{libro.prestamos} préstamos</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {librosFiltrados.map((libro) => (
                      <Card key={libro.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{libro.titulo}</h3>
                            <p className="text-gray-600">por {libro.autor}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{libro.categoria}</Badge>
                              <Badge variant={libro.disponible ? "default" : "destructive"}>
                                {libro.disponible ? "Disponible" : "Prestado"}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{libro.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-2">{libro.prestamos} préstamos</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => setLibroSeleccionado(libro)}>
                                <Eye className="h-3 w-3 mr-1" />
                                Ver
                              </Button>
                              {libro.disponible && (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setLibroParaPrestar(libro)
                                    setModalPrestarLibro(true)
                                  }}
                                >
                                  Prestar
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">Usuarios Registrados</CardTitle>
                    <CardDescription className="text-green-100">
                      {usuarios.length} usuarios registrados en el sistema
                    </CardDescription>
                  </div>
                  <Dialog open={modalAgregarUsuario} onOpenChange={setModalAgregarUsuario}>
                    <DialogTrigger asChild>
                      <Button className="bg-white text-green-600 hover:bg-green-50">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Usuario
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Registrar Nuevo Usuario</DialogTitle>
                        <DialogDescription>
                          Completa la información del usuario para registrarlo en el sistema
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre completo *</Label>
                          <Input
                            id="nombre"
                            placeholder="Nombre y apellidos"
                            value={nuevoUsuario.nombre}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="correo">Correo electrónico *</Label>
                          <Input
                            id="correo"
                            type="email"
                            placeholder="usuario@ejemplo.com"
                            value={nuevoUsuario.correo}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
                          />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="direccion">Dirección</Label>
                          <Input
                            id="direccion"
                            placeholder="Dirección completa"
                            value={nuevoUsuario.direccion}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, direccion: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setModalAgregarUsuario(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAgregarUsuario}>Registrar Usuario</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {usuarios.map((usuario) => (
                    <Card
                      key={usuario.id}
                      className="hover:shadow-md transition-all duration-200 hover:border-green-200"
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                          <span className="text-green-700 font-bold text-lg">
                            {usuario.nombre
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{usuario.nombre}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {usuario.correo}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Registro: {usuario.fechaRegistro}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            {usuario.direccion}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={usuario.estado === "Activo" ? "default" : "destructive"}>
                              {usuario.estado}
                            </Badge>
                            <Badge variant="secondary">{usuario.prestamos} préstamos</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setUsuarioSeleccionado(usuario)}>
                              <Eye className="h-3 w-3 mr-1" />
                              Ver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setUsuarioParaEditar({ ...usuario })
                                setModalEditarUsuario(true)
                              }}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prestamos" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Préstamos Activos</CardTitle>
                <CardDescription className="text-orange-100">
                  {prestamosActivos.length} préstamos activos en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {prestamosActivos.map((prestamo) => (
                    <Card
                      key={prestamo.id}
                      className={`hover:shadow-md transition-all duration-200 ${
                        prestamo.diasRetraso > 0 ? "border-red-200 bg-red-50" : "hover:border-orange-200"
                      }`}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{prestamo.libro}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {prestamo.usuario}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Préstamo: {prestamo.fechaPrestamo}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Vence: {prestamo.fechaVencimiento}
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          {prestamo.diasRetraso > 0 ? (
                            <div className="flex items-center gap-2 text-red-600">
                              <AlertTriangle className="h-5 w-5" />
                              <div>
                                <span className="text-sm font-bold">{prestamo.diasRetraso} días</span>
                                <p className="text-xs">de retraso</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="h-5 w-5" />
                              <div>
                                <span className="text-sm font-bold">A tiempo</span>
                                <p className="text-xs">Sin retraso</p>
                              </div>
                            </div>
                          )}
                          <Button
                            variant={prestamo.diasRetraso > 0 ? "destructive" : "default"}
                            onClick={() => handleDevolverLibro(prestamo)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Procesar Devolución
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reportes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Libros por Categoría
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { categoria: "Novela", disponibles: 2, total: 3, color: "bg-blue-500" },
                      { categoria: "Distopía", disponibles: 2, total: 2, color: "bg-green-500" },
                      { categoria: "Fantasía", disponibles: 2, total: 2, color: "bg-purple-500" },
                      { categoria: "Clásico", disponibles: 1, total: 2, color: "bg-orange-500" },
                      { categoria: "Suspenso", disponibles: 2, total: 2, color: "bg-red-500" },
                      { categoria: "Programación", disponibles: 1, total: 1, color: "bg-indigo-500" },
                      { categoria: "Historia", disponibles: 1, total: 1, color: "bg-pink-500" },
                      { categoria: "Épico", disponibles: 0, total: 1, color: "bg-yellow-500" },
                      { categoria: "Ciencia Ficción", disponibles: 0, total: 1, color: "bg-teal-500" },
                      { categoria: "Infantil", disponibles: 1, total: 1, color: "bg-cyan-500" },
                      { categoria: "Ficción", disponibles: 1, total: 1, color: "bg-lime-500" },
                      { categoria: "Estrategia", disponibles: 1, total: 1, color: "bg-amber-500" },
                      { categoria: "Tragedia", disponibles: 1, total: 1, color: "bg-rose-500" },
                      { categoria: "Matemáticas", disponibles: 1, total: 1, color: "bg-violet-500" },
                    ].map((cat) => (
                      <div
                        key={cat.categoria}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${cat.color}`}></div>
                          <span className="font-medium">{cat.categoria}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${cat.color}`}
                              style={{ width: `${cat.total > 0 ? (cat.disponibles / cat.total) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600 w-12 text-right">
                            {cat.disponibles}/{cat.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Usuarios Más Activos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {usuarios
                      .sort((a, b) => b.prestamos - a.prestamos)
                      .map((usuario, index) => (
                        <div
                          key={usuario.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                index === 0
                                  ? "bg-yellow-500"
                                  : index === 1
                                    ? "bg-gray-400"
                                    : index === 2
                                      ? "bg-orange-600"
                                      : "bg-blue-500"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                              <span className="text-indigo-700 font-bold text-xs">
                                {usuario.nombre
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <span className="font-medium">{usuario.nombre}</span>
                          </div>
                          <Badge variant="secondary" className="font-bold">
                            {usuario.prestamos} préstamos
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Métricas adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-800">
                  {Math.round((estadisticas.librosPrestados / estadisticas.totalLibros) * 100)}%
                </h3>
                <p className="text-blue-600">Tasa de ocupación</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800">
                  {(usuarios.reduce((acc, u) => acc + u.prestamos, 0) / usuarios.length).toFixed(1)}
                </h3>
                <p className="text-green-600">Préstamos promedio por usuario</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-purple-800">
                  {prestamosActivos.filter((p) => p.diasRetraso > 0).length}
                </h3>
                <p className="text-purple-600">Préstamos con retraso</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-orange-800">{categorias.length - 1}</h3>
                <p className="text-orange-600">Categorías disponibles</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de préstamo de libro */}
        <Dialog open={modalPrestarLibro} onOpenChange={setModalPrestarLibro}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Prestar Libro</DialogTitle>
              <DialogDescription>
                Selecciona el usuario al que deseas prestar "{libroParaPrestar?.titulo}"
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario *</Label>
                <Select value={usuarioSeleccionadoPrestamo} onValueChange={setUsuarioSeleccionadoPrestamo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un usuario activo" />
                  </SelectTrigger>
                  <SelectContent>
                    {usuarios
                      .filter((usuario) => usuario.estado === "Activo")
                      .map((usuario) => (
                        <SelectItem key={usuario.id} value={usuario.id.toString()}>
                          {usuario.nombre} - {usuario.correo}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Información del préstamo</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Libro:</span> {libroParaPrestar?.titulo}
                  </p>
                  <p>
                    <span className="font-medium">Fecha de préstamo:</span> {new Date().toLocaleDateString("es-ES")}
                  </p>
                  <p>
                    <span className="font-medium">Fecha de devolución:</span>{" "}
                    {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("es-ES")}
                  </p>
                  <p className="text-orange-600">
                    <span className="font-medium">Duración:</span> 14 días
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalPrestarLibro(false)}>
                Cancelar
              </Button>
              <Button onClick={handlePrestarLibro} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <BookOpen className="h-4 w-4 mr-2" />
                )}
                Confirmar Préstamo
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de detalles del libro */}
        <Dialog open={!!libroSeleccionado} onOpenChange={() => setLibroSeleccionado(null)}>
          <DialogContent className="max-w-2xl">
            {libroSeleccionado && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{libroSeleccionado.titulo}</DialogTitle>
                  <DialogDescription>por {libroSeleccionado.autor}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-24 w-24 text-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Información del libro</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID:</span>
                          <span>{libroSeleccionado.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Categoría:</span>
                          <Badge variant="secondary">{libroSeleccionado.categoria}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Calificación:</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{libroSeleccionado.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estado:</span>
                          <Badge variant={libroSeleccionado.disponible ? "default" : "destructive"}>
                            {libroSeleccionado.disponible ? "Disponible" : "Prestado"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total de préstamos:</span>
                          <span>{libroSeleccionado.prestamos}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      {libroSeleccionado.disponible ? (
                        <Button
                          className="flex-1"
                          onClick={() => {
                            setLibroParaPrestar(libroSeleccionado)
                            setModalPrestarLibro(true)
                            setLibroSeleccionado(null)
                          }}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Prestar Libro
                        </Button>
                      ) : (
                        <Button variant="outline" className="flex-1 bg-transparent" disabled>
                          <XCircle className="h-4 w-4 mr-2" />
                          No Disponible
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => {
                          setLibroParaEditar({ ...libroSeleccionado })
                          setModalEditarLibro(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de detalles del usuario */}
        <Dialog open={!!usuarioSeleccionado} onOpenChange={() => setUsuarioSeleccionado(null)}>
          <DialogContent>
            {usuarioSeleccionado && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{usuarioSeleccionado.nombre}</DialogTitle>
                  <DialogDescription>Información detallada del usuario</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <span className="text-green-700 font-bold text-2xl">
                        {usuarioSeleccionado.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{usuarioSeleccionado.nombre}</h3>
                      <Badge variant={usuarioSeleccionado.estado === "Activo" ? "default" : "destructive"}>
                        {usuarioSeleccionado.estado}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">ID Usuario:</span>
                      <p className="font-medium">{usuarioSeleccionado.id}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Correo:</span>
                      <p className="font-medium">{usuarioSeleccionado.correo}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Dirección:</span>
                      <p className="font-medium">{usuarioSeleccionado.direccion}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Fecha de registro:</span>
                      <p className="font-medium">{usuarioSeleccionado.fechaRegistro}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total de préstamos:</span>
                      <p className="font-medium">{usuarioSeleccionado.prestamos}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setUsuarioParaEditar({ ...usuarioSeleccionado })
                        setModalEditarUsuario(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Usuario
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Historial
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de editar libro */}
        <Dialog open={modalEditarLibro} onOpenChange={setModalEditarLibro}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Libro</DialogTitle>
              <DialogDescription>Modifica la información del libro</DialogDescription>
            </DialogHeader>
            {libroParaEditar && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo-edit">Título *</Label>
                  <Input
                    id="titulo-edit"
                    placeholder="Título del libro"
                    value={libroParaEditar.titulo}
                    onChange={(e) => setLibroParaEditar({ ...libroParaEditar, titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autor-edit">Autor *</Label>
                  <Input
                    id="autor-edit"
                    placeholder="Nombre del autor"
                    value={libroParaEditar.autor}
                    onChange={(e) => setLibroParaEditar({ ...libroParaEditar, autor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria-edit">Categoría *</Label>
                  <Select
                    value={libroParaEditar.categoria}
                    onValueChange={(value) => setLibroParaEditar({ ...libroParaEditar, categoria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.slice(1).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disponibilidad-edit">Disponibilidad</Label>
                  <Select
                    value={libroParaEditar.disponible.toString()}
                    onValueChange={(value) => setLibroParaEditar({ ...libroParaEditar, disponible: value === "true" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estado del libro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Disponible</SelectItem>
                      <SelectItem value="false">No disponible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating-edit">Calificación</Label>
                  <Input
                    id="rating-edit"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="4.5"
                    value={libroParaEditar.rating}
                    onChange={(e) =>
                      setLibroParaEditar({ ...libroParaEditar, rating: Number.parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prestamos-edit">Total de préstamos</Label>
                  <Input
                    id="prestamos-edit"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={libroParaEditar.prestamos}
                    onChange={(e) =>
                      setLibroParaEditar({ ...libroParaEditar, prestamos: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalEditarLibro(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditarLibro}>Guardar Cambios</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de editar usuario */}
        <Dialog open={modalEditarUsuario} onOpenChange={setModalEditarUsuario}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Usuario</DialogTitle>
              <DialogDescription>Modifica la información del usuario</DialogDescription>
            </DialogHeader>
            {usuarioParaEditar && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-edit">Nombre completo *</Label>
                  <Input
                    id="nombre-edit"
                    placeholder="Nombre y apellidos"
                    value={usuarioParaEditar.nombre}
                    onChange={(e) => setUsuarioParaEditar({ ...usuarioParaEditar, nombre: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correo-edit">Correo electrónico *</Label>
                  <Input
                    id="correo-edit"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    value={usuarioParaEditar.correo}
                    onChange={(e) => setUsuarioParaEditar({ ...usuarioParaEditar, correo: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="direccion-edit">Dirección</Label>
                  <Input
                    id="direccion-edit"
                    placeholder="Dirección completa"
                    value={usuarioParaEditar.direccion}
                    onChange={(e) => setUsuarioParaEditar({ ...usuarioParaEditar, direccion: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado-edit">Estado</Label>
                  <Select
                    value={usuarioParaEditar.estado}
                    onValueChange={(value) => setUsuarioParaEditar({ ...usuarioParaEditar, estado: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estado del usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Retraso">Retraso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prestamos-usuario-edit">Total de préstamos</Label>
                  <Input
                    id="prestamos-usuario-edit"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={usuarioParaEditar.prestamos}
                    onChange={(e) =>
                      setUsuarioParaEditar({ ...usuarioParaEditar, prestamos: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalEditarUsuario(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditarUsuario}>Guardar Cambios</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </div>
  )
}
