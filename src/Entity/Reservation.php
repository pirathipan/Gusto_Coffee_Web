<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ReservationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;

/**
 * @ApiResource(
 *     forceEager=false,
 *       normalizationContext={"groups"={"reservation:read", "salon:read", "client:read", "enable_max_depth"=true}},
 *     denormalizationContext={"groups"={"reservation:write"}}
 * )
 * @ApiFilter(
 *     SearchFilter::class, properties={"client"="exact"}
 * )
 * @ApiFilter(
 *     DateFilter::class, properties={"dateDebut"}
 * )
 * @ApiFilter(
 *     DateFilter::class, properties={"heureDebut"}
 * )
 *  @ApiFilter(
 *     DateFilter::class, properties={"heureFin"}
 * )
 * @ORM\Entity(repositoryClass=ReservationRepository::class)
 */
class Reservation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *  @Groups("reservation:read")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"reservation:read", "reservation:write"})
     */
    private ?\DateTimeInterface $dateDebut;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="reservations")
     * @Groups({"reservation:read", "reservation:write"})
     */
    private ?Client $client;


    /**
     * @ORM\Column(type="time")
     * @Groups({"reservation:read", "reservation:write"})
     */
    private ?\DateTimeInterface $heureDebut;

    /**
     * @ORM\Column(type="time")
     * @Groups({"reservation:read", "reservation:write"})
     */
    private ?\DateTimeInterface $heureFin;


    /**
     * @ORM\ManyToOne(targetEntity=Salon::class, inversedBy="reservation")
     * @Groups({"reservation:read", "reservation:write"})
     */
    private ?Salon $salon;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"reservation:read", "reservation:write"})
     */
    private ?int $duree;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }


    public function getHeureDebut(): ?\DateTimeInterface
    {
        return $this->heureDebut;
    }

    public function setHeureDebut(\DateTimeInterface $heureDebut): self
    {
        $this->heureDebut = $heureDebut;

        return $this;
    }

    public function getHeureFin(): ?\DateTimeInterface
    {
        return $this->heureFin;
    }

    public function setHeureFin(\DateTimeInterface $heureFin): self
    {
        $this->heureFin = $heureFin;

        return $this;
    }


    public function getSalon(): ?Salon
    {
        return $this->salon;
    }

    public function setSalon(?Salon $salon): self
    {
        $this->salon = $salon;

        return $this;
    }

    public function getDuree(): ?int
    {
        return $this->duree;
    }

    public function setDuree(int $duree): self
    {
        $this->duree = $duree;

        return $this;
    }
    
}
