<?php

namespace App\Serializer;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Exception\BadMethodCallException;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Exception\ExtraAttributesException;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Exception\RuntimeException;
use Symfony\Component\Serializer\Exception\UnexpectedValueException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class UploadedFileDenormalizer implements DenormalizerInterface
{

    /**
     * @inheritDoc
     */
    public function denormalize($data, string $type, string $format = null, array $context = []): UploadedFile
    {
        return $data;
    }

    /**
     * @inheritDoc
     */
    public function supportsDenormalization($data, string $type, string $format = null): bool
    {
        return $data instanceof UploadedFile;
    }
}
